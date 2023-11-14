import Chart from "react-apexcharts";
const LowStock = () => {
    let data = {
        options: {            
            xaxis: {
                categories: ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9", "item10"],
                axisBorder: { show: false },
                labels: { show: true },
                
            },
            plotOptions: {
                bar: {
                  distributed: true
                }
            }, 
            yaxis: {

            },
            
            grid: {
                show:true
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
                text: " Low Stock Inventory top ten",
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
                    y: 15,
                    // fillColor: '#2997FF',
                    // strokeColor: '#2997FF'
                },
                {
                    x: 'Purchase',
                    y: 18,
                    // fillColor: '#E39E9E',
                    // strokeColor: '#E39E9E'
                    
                },{
                    x: 'Purchase',
                    y: 6,
                    // fillColor: '#E39E9E',
                    // strokeColor: '#E39E9E'
                    
                },{
                    x: 'Purchase',
                    y: 5,
                    // fillColor: '#E39E9E',
                    // strokeColor: '#E39E9E'
                    
                },{
                    x: 'Purchase',
                    y: 30,
                    // fillColor: '#E39E9E',
                    // strokeColor: '#E39E9E'
                    
                },{
                    x: 'Purchase',
                    y: 14,
                    // fillColor: '#E39E9E',
                    // strokeColor: '#E39E9E'
                    
                },{
                    x: 'Purchase',
                    y: 17,
                    // fillColor: '#E39E9E',
                    // strokeColor: '#E39E9E'
                    
                },{
                    x: 'Purchase',
                    y: 25,
                    // fillColor: '#E39E9E',
                    // strokeColor: '#E39E9E'
                    
                },{
                    x: 'Purchase',
                    y: 2,
                    // fillColor: '#E39E9E',
                    // strokeColor: '#E39E9E'
                    
                },{
                    x: 'Purchase',
                    y: 10,
                    // fillColor: '#E39E9E',
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
 
export default LowStock;