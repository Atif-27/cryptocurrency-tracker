import Head from "next/head";
import CryptoForm from "../components/CryptoForm";
export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Crypto Stats</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">Crypto Stats</h1>
      <CryptoForm />
    </div>
  );
}
