interface WalletDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WalletDetailsPage({
  params,
}: WalletDetailsPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">
            Wallet Details
          </h1>

          <p className="mt-2 text-gray-600">
            Wallet ID: {id}
          </p>

          <div className="mt-8 rounded-xl border border-dashed p-8">
            <p className="font-medium text-gray-700">
              Wallet details
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Detailed wallet balance, transaction history,
              funding, refunds, and wallet controls will be
              implemented in the Wallet milestone.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}