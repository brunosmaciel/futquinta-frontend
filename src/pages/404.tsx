import Link from 'next/link';

export default function FourOhFour() {
  return (
    <div className="flex flex-col items-center justify-center container-height">
      <h1>404 - Page Not Found</h1>
      <Link href="/" className="btn w-fit">
        Voltar para o inicio
      </Link>
    </div>
  );
}
