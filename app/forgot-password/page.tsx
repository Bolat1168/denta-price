'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || 'Ошибка отправки');
      }
    } catch {
      setError('Ошибка сети');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Восстановление пароля</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Введите email, указанный при регистрации. Мы отправим ссылку для сброса пароля.
        </p>

        {success ? (
          <div>
            <div className="mb-4 text-sm text-green-600 bg-green-50 p-3 rounded text-center">
              Ссылка для сброса пароля отправлена на {email}
            </div>
            <Link
              href="/login"
              className="block w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-center"
            >
              Вернуться ко входу
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            {error && <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Отправка...' : 'Отправить ссылку'}
            </button>
            <p className="mt-4 text-center text-sm">
              <Link href="/login" className="text-blue-600 hover:underline">
                Вернуться ко входу
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}