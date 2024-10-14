import React, { useState } from "react";
import { Link } from "react-router-dom";
import { WeatherToday } from "../datas/WeatherToday";

const WeatherList = () => {
  // ดึงข้อมูลสถานีจาก WeatherToday
  let stations = WeatherToday[0].Stations.Station;

  // State สำหรับเก็บข้อมูลที่ป้อนใน search bar
  const [searchTerm, setSearchTerm] = useState("");

  // เรียงข้อมูลตามจังหวัด (Province) ก่อนกรอง
  const sortedStations = stations.sort((a, b) => {
    return a.Province.localeCompare(b.Province);
  });

  // function กรองข้อมูลสถานีตามชื่อสถานีหรือจังหวัด
  const filteredStations = sortedStations.filter((station) => {
    return (
      station.StationNameThai.includes(searchTerm) ||
      station.Province.includes(searchTerm)
    );
  });

  return (
    <div className="container mx-auto px-5 sm:px-5 md:px-5 lg:px-12 xl:px-12 2xl:px-12 pt-8">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-4">รายงานสภาพอากาศ</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="ค้นหาตามชื่อสถานีหรือจังหวัด"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-400 p-2 mb-6 w-full rounded"
      />

      {/* รายงานสภาพอากาศ */}
      <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-5">
        {filteredStations.map((station, index) => (
          <li key={index} className="bg-white shadow-md rounded-2xl p-4">
            <Link
              to={`/station/${station.WmoStationNumber}`}
              className="text-black hover:text-sky-800 text-sm sm:text-base"
            >
              สถานี: {station.StationNameThai} ({station.Province})
            </Link>
          </li>
        ))}
      </ul>

      {/* แสดงข้อความเมื่อไม่มีผลลัพธ์ */}
      {filteredStations.length === 0 && (
        <p className="text-center text-black">ไม่พบสถานีหรือจังหวัดที่ตรงกัน</p>
      )}
    </div>
  );
};

export default WeatherList;