import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { WeatherToday } from "../datas/WeatherToday";

const WeatherDetail = () => {
  const { WmoStationNumber } = useParams();  // ดึง WmoStationNumber จาก URL
  const station = WeatherToday[0].Stations.Station.find(
    (station) => station.WmoStationNumber === WmoStationNumber // หาสถานีที่มี WmoStationNumber ตรงกัน
  );

  // ถ้าไม่พบสถานี ให้เปลี่ยนเส้นทางไปหน้า ErrorPage
  if (!station) {
    return <Navigate to="/notfound" />;
  }

  return (
    <div className="container mx-auto px-5 sm:px-5 md:px-5 lg:px-12 xl:px-12 2xl:px-12 pt-8">
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">
          สถานี {station.StationNameThai}
        </h2>
        <p className="text-base sm:text-lg mb-6 text-center">จังหวัด: {station.Province}</p>

        {/* Grid layout สำหรับการแสดงข้อมูล */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-sm sm:text-base ">ความกดอากาศที่ระดับน้ำทะเล: {station.Observation.MeanSeaLevelPressure} hPa</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-sm sm:text-base">อุณหภูมิ: {station.Observation.Temperature}°C</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-sm sm:text-base">อุณหภูมิสูงสุด: {station.Observation.MaxTemperature}°C</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-sm sm:text-base">ต่างจากอุณหภูมิสูงสุด: {station.Observation.DifferentFromMaxTemperature}°C</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-sm sm:text-base">อุณหภูมิต่ำสุด: {station.Observation.MinTemperature}°C</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-sm sm:text-base">ต่างจากอุณหภูมิต่ำสุด: {station.Observation.DifferentFromMinTemperature}°C</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-sm sm:text-base">ความชื้นสัมพัทธ์: {station.Observation.RelativeHumidity}%</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-sm sm:text-base">ทิศทางลม: {station.Observation.WindDirection}°</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-sm sm:text-base">ความเร็วลม: {station.Observation.WindSpeed} km/h</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-sm sm:text-base">ปริมาณน้ำฝน: {station.Observation.Rainfall} mm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetail;
