from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
import sqlite3
import uuid
import requests
from datetime import datetime

app = Flask(__name__)
CORS(app)

# === KASSA24 ===
MERCHANT_ID = "ВАШ_MERCHANT_ID"
API_KEY = "ВАШ_API_KEY"
API_URL = "https://ecommerce.pult24.kz/payment/create"

# === БАЗА ДАННЫХ ===
def init_db():
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS dentists
                 (id TEXT PRIMARY KEY, full_name TEXT, photo_url TEXT, whatsapp TEXT, address TEXT, updated_at TEXT)''')
    c.execute('''CREATE TABLE IF NOT EXISTS dentist_services
                 (dentist_id TEXT, service_id TEXT, price INTEGER, radius_km TEXT, segment TEXT, 
                  is_paid INTEGER, paid_at TEXT, active_from TEXT)''')
    c.execute('''CREATE TABLE IF NOT EXISTS slots
                 (id TEXT PRIMARY KEY, dentist_id TEXT, service_id TEXT, radius TEXT, amount INTEGER, 
                  status TEXT, created_at TEXT, payment_url TEXT)''')
    conn.commit()
    conn.close()

init_db()

# === ПОЛУЧИТЬ ДАННЫЕ ВРАЧА ===
@app.route('/api/dentists/<dentist_id>', methods=['GET'])
def get_dentist(dentist_id):
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.execute('SELECT full_name, photo_url, whatsapp, address FROM dentists WHERE id = ?', (dentist_id,))
    row = c.fetchone()
    full_name, photo_url, whatsapp, address = row if row else ('', '', '', '')
    c.execute('SELECT service_id, price, radius_km, segment, is_paid, paid_at, active_from FROM dentist_services WHERE dentist_id = ?', (dentist_id,))
    services = [{'serviceId': r[0], 'price': r[1], 'radiusKm': r[2], 'segment': r[3], 'isPaid': bool(r[4]), 'paidAt': r[5], 'activeFrom': r[6]} for r in c.fetchall()]
    conn.close()
    return jsonify({'dentistId': dentist_id, 'fullName': full_name, 'photoUrl': photo_url, 'whatsapp': whatsapp, 'address': address, 'services': services})

# === СОХРАНИТЬ ДАННЫЕ ВРАЧА ===
@app.route('/api/dentists/<dentist_id>', methods=['PUT'])
def put_dentist(dentist_id):
    data = request.json
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.execute('INSERT OR REPLACE INTO dentists (id, full_name, photo_url, whatsapp, address, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
              (dentist_id, data.get('fullName', ''), data.get('photoUrl', ''), data.get('whatsapp', ''), data.get('address', ''), datetime.now().isoformat()))
    c.execute('DELETE FROM dentist_services WHERE dentist_id = ?', (dentist_id,))
    for s in data.get('services', []):
        c.execute('INSERT INTO dentist_services (dentist_id, service_id, price, radius_km, segment, is_paid, paid_at, active_from) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                  (dentist_id, s['serviceId'], s.get('price'), s.get('radiusKm'), s.get('segment'), 1 if s.get('isPaid') else 0, s.get('paidAt'), s.get('activeFrom')))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

# === СОЗДАТЬ ПЛАТЁЖ ===
@app.route('/api/promo-payments', methods=['POST'])
def promo_payments():
    data = request.json
    dentist_id = data.get('dentistId')
    service_id = data.get('serviceId')
    radius = data.get('radius')
    amount = data.get('amount')
    if not all([dentist_id, service_id, radius, amount]):
        return jsonify({'error': 'Missing fields'}), 400
    slot_id = str(uuid.uuid4())
    conn = sqlite3.connect('data.db')
    c = conn.cursor()
    c.execute('INSERT INTO slots (id, dentist_id, service_id, radius, amount, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
              (slot_id, dentist_id, service_id, radius, amount, 'pending', datetime.now().isoformat()))
    conn.commit()
    conn.close()
    payload = {
        'merchantId': MERCHANT_ID,
        'orderID': slot_id,
        'amount': amount,
        'description': f'{service_id} - {radius}',
        'callbackUrl': 'https://denta-price.pro/api/callback'
    }
    headers = {'Content-Type': 'application/json'}
    try:
        r = requests.post(API_URL, json=payload, headers=headers, auth=(MERCHANT_ID, API_KEY))
        if r.status_code == 200:
            payment_url = r.json().get('url')
            return jsonify({'success': True, 'paymentRecordId': slot_id, 'paymentUrl': payment_url})
        return jsonify({'error': 'Kassa24 error', 'details': r.text}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# === CALLBACK ===
@app.route('/api/callback', methods=['POST'])
def callback():
    data = request.json
    slot_id = data.get('orderID')
    status = data.get('status')
    if status == 1:
        conn = sqlite3.connect('data.db')
        c = conn.cursor()
        c.execute('UPDATE slots SET status = "paid" WHERE id = ?', (slot_id,))
        conn.commit()
        conn.close()
    return 'OK'

# === СТАТУС НИШИ ===
@app.route('/api/niche-status', methods=['GET'])
def niche_status():
    return jsonify({'status': 'green', 'price': 590})

# === СТАТИСТИКА ===
@app.route('/api/stats/get-dentist-stats', methods=['GET'])
def get_stats():
    return jsonify({})

# === ЗАПУСК ===
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)