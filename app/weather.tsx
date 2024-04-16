const weather = async () => {
  const response = await fetch(
    "https://openweathermap.org/data/2.5/weather?id=2964574&appid=439d4b804bc8187953eb36d2a8c26a02",
    { cache: "no-store" }
  );
  return await response.json();
};

export const dynamic = "force-dynamic";

export default async function Weather() {
  const weather_data = await weather();
  const timestamp = weather_data.dt * 1000;
  const utc_date = new Date(timestamp);
  const offset_seconds = weather_data.timezone;
  const milliseconds = utc_date.getTime() + (offset_seconds * 1000);
  const current_time = new Date(milliseconds);

  return (
    <div className="w-full bg-slate-200 px-20 py-4 flex justify-center mt-auto">
      <div className="w-2/4 flex justify-between">
        <div>
          <h6>{weather_data.name}</h6>
          <h6>
            {current_time.getHours()}:{current_time.getMinutes()}
          </h6>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            {Math.round(weather_data.main.temp)}°C
          </h1>
          <span className="text-sm text-gray-600">
            {weather_data.weather[0].main}
          </span>
        </div>
        <div className="flex items-center">
          <div className="text-sm mr-4">
            <div>
              <i className="text-gray-600"></i>
              <span className="ml-1">
                {Math.round(weather_data.wind.speed)}km/h
              </span>
            </div>
            <div>
              <i className="text-gray-600"></i>
              <span className="ml-1">{weather_data.main.pressure}</span>
            </div>
            <div>
              <i className="text-gray-600"></i>
              <span className="ml-1">{weather_data.main.humidity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
