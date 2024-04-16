const fetch_api = async () => {
  const response = await fetch("https://api.coincap.io/v2/assets", {
    cache: "no-store",
  });
  return await response.json();
};

export default async function API() {
  const coin_data = await fetch_api();
  const coin_data_filter = coin_data.data.filter((item: any) => {
    return (
      item.symbol === "BTC" ||
      item.symbol === "ETH" ||
      item.symbol === "USDT" ||
      item.symbol === "DOGE" ||
      item.symbol === "BNB"
    );
  });
  return (
    <div className="flex bg-slate-200 gap-10 px-20 py-2 overflow-scroll justify-center">
      {coin_data_filter?.map((coin: any) => (
        <div key={coin.id} className="flex flex-col">
          <p>{coin.symbol}</p>
          <p className="text-ellipsis">{coin.priceUsd}</p>
        </div>
      ))}
    </div>
  );
}
