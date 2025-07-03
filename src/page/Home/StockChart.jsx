import React, { useEffect } from 'react'
import ReactApexChart from "react-apexcharts";
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { fetchMarketChart } from '@/State/Coin/Action';
import { fetchCoinById } from '@/State/Coin/Action';
import { useDispatch, useSelector } from 'react-redux';
const timeSeries = [
    {
      keyword: "DIGITAL_CURRENCY_DAILY",
      key: "Time Series (Daily)",
      lable: "1 Day",
      value: 1,
    },
    {
      keyword: "DIGITAL_CURRENCY_WEEKLY",
      key: "Weekly Time Series",
      lable: "1 Week",
      value: 7,
    },
    {
      keyword: "DIGITAL_CURRENCY_MONTHLY",
      key: "Monthly Time Series",
      lable: "1 Month",
      value: 30,
    },
    {
        keyword: "DIGITAL_CURRENCY_Yearly",
        key: "Yearly Time Series",
        lable: "1 year",
        value: 365,
      },

  ];


  const StockChart = ({ coinId }) => {
    const dispatch = useDispatch();
    const { coin } = useSelector((store) => store);

    const [activeLable, setActiveLable] = useState(timeSeries[0]);
    const searies = [
        {
            data: coin.marketChart.data,
        },
    ];

    const options = {
        chart: {
            id: "area-datetime",
            type: "area",
            height: 350,
            zoom: {
                autoScaleYaxis: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            type: "datetime",
            tickAmount: 6,
        },
        yaxis: {
            labels: {
                formatter: (value) => value.toFixed(2), // Formatăm cu 2 zecimale
            },
        },
        colors: ["#1770e6"],
        markers: {
            colors: ["#fff"],
            strokeColor: "#fff",
            strokeOpacity: 0.2,
            strokeWidth: 1,
            strokeDashArray: 0,
            fillOpacity: 1,
            size: 0,
            style: "hollow",
        },
        tooltip: {
            theme: "dark",
            y: {
                formatter: (value) => value.toFixed(2), // Formatăm valoarea tooltip-ului cu 2 zecimale
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 0.25,
                opacityFrom: 0.7,
                opacityTo: 1,
                stops: [0, 100],
            },
        },
        grid: {
            borderColor: "#47535E",
            strokeDashArray: 4,
            show: true,
        },
    };

    const handleActiveLable = (value) => {
        setActiveLable(value);
    };

    useEffect(() => {
        dispatch(
            fetchMarketChart({
                coinId,
                days: activeLable.value,
                jwt: localStorage.getItem("jwt"),
            })
        );
    }, [dispatch, activeLable, coinId]);

    return (
        <div id="charts">
            <div className="toolbars space-x-3">
                {timeSeries.map((item) => (
                    <Button
                        variant={activeLable.lable === item.lable ? "" : "outline"}
                        onClick={() => handleActiveLable(item)}
                        key={item.lable}
                    >
                        {item.lable}
                    </Button>
                ))}
            </div>
            <div id="chart-timeplines">
                <ReactApexChart
                    options={options}
                    series={searies}
                    height={450}
                />
            </div>
        </div>
    );
};

export default StockChart;
