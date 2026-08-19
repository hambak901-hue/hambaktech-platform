import WalletTransactions from "./WalletTransactions";

interface WalletHistoryProps {
  transactions: {
    id: string;
    reference: string;
    amount: string;
    type: string;
    status: string;
    description: string | null;
    createdAt: string;
  }[];
  currency: string;
}

export default function WalletHistory({
  transactions,
  currency,
}: WalletHistoryProps) {
  return (
    <section>
      <WalletTransactions
        transactions={transactions}
        currency={currency}
      />
    </section>
  );
}
