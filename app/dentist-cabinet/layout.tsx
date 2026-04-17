export default function DentistCabinetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dentist-cabinet-layout">
      {children}
    </div>
  );
}