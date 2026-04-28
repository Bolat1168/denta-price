'use client';

export default function ContactsPage() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white font-sans p-8">
      <h1 className="text-3xl font-black mb-6">Контакты</h1>
      <p className="mb-2"><strong>Юридический адрес:</strong> г. Алматы, пр. Достык, д. 121/3</p>
      <p className="mb-2"><strong>Телефон:</strong> +7 (727) 123-45-67</p>
      <p className="mb-2"><strong>Email:</strong> info@dentaprice.kz</p>
    </div>
  );
}