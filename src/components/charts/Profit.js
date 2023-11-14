import Chart from "react-apexcharts";
const Profit = () => {

    let data = {
        options: {
            type:"bar",
            
            plotOptions: {
                bar: {
                    horizontal: true
                }
            },
            xaxis: {
                categories: [["$" + 25000 , "Sale"], ["$" + 32000,"Purchase"]],
                axisBorder: { show: false },
                labels: { show: false },
                
            },
            yaxis: {

            },
            
            grid: {
                show:false
            },
            
            dataLabels: {
                enabled: false
            },

            chart:{
                events: {
                    click: function(event, chartContext, config) {
                        // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
                        // alert("");
                    }
                },
                
            },

            tooltip: {
                enabled: false,
            },

            title: {
                text: "Profit for this month",
                align: 'left',
                margin: 0,
                offsetX: 10,
                offsetY: 10,
                floating: false,
                style: {
                  fontSize:  '20px',
                  fontWeight:  'bold',
                //   fontFamily:  undefined,
                  color:  '#57655D'
                },
            },

            states: {
                hover: {
                    filter: {
                        type: 'none',
                    }
                },
                active: {
                    filter: {
                        type: 'none',
                    }
                },
            },

          
        },
        series: [
          {
            // name: "series-1",
            data: [
                {
                    x: 'Sale',
                    y: 25000,
                    fillColor: '#2997FF',
                    // strokeColor: '#2997FF'
                },
                {
                    x: 'Purchase',
                    y: 32000,
                    fillColor: '#E39E9E',
                    // strokeColor: '#E39E9E'
                    
                },
                
            ]
          }
        ],       
      };
    
    return ( 
        <>
            <Chart
               options={data.options}
               series={data.series}
               type="bar"
               width="100%"
               height="100%"
               
            />

        </>
     );
}
 
export default Profit;