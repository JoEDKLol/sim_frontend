import Chart from "react-apexcharts";
const Selling = () => {

    let data = {
        series: [44, 55, 41],
        options: {
            title: {
                text: "Selling for this month",
                align: 'left',
                margin: 10,
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
            chart:{
                toolbar: {
                    show:true
                }
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                padding: {
                    top: 20,
                    bottom: 20,
                    // left: 
                }
            },
            legend: {
                show: true,
                position: 'left',
                offsetX: 0,
                offsetY: 70,
                fontSize: '20px',
                fontFamily: 'Helvetica, Arial',
                fontWeight: 400,


            },
            tooltip: {
                enabled: false,
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

    }


    return ( <>
        <Chart
            options={data.options}
            series={data.series}
            type="donut"
            width="100%"
            height="100%"
        />

        
    </> );
}
 
export default Selling;