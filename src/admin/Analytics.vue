<template>
    <div class="analytics_container">
        <div class="analytics_title">
            <p>상품 판매 순위</p>
            <p>이 그래프는 상품의 판매 순위를 나타냅니다.</p>
        </div>
        <canvas ref="MyChart"></canvas>
    </div>
    <!-- <div class="analytics_container" style="margin-left: 100px">
        <div>준비 중</div>
    </div> -->
    
</template>
<script>
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
    data() {
        return {
            arrLabels: [],
            arrData: []
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        createChart(){
            new Chart(this.$refs.MyChart, {
                type: 'doughnut',
                data:{
                    labels: this.arrLabels, 
                    datasets: [{
                        label: "판매량",
                        data: this.arrData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                // options: {
                //     scales: {
                //         y: {
                //             beginAtZero: true
                //         }
                //     }
                // }
            })
        },
        getData() {
            axios({
                url: "http://localhost:3000/admin/salesRate",
                method: "GET",
            }).then(res => {
                const returnData = res.data.data;
                
                const arrLabels = [];
                const arrData = [];

                for(let i in returnData) {
                    this.arrLabels.push(returnData[i].goods_nm);
                    this.arrData.push(returnData[i].order_tc);
                }

                this.createChart();
            })
        }
    }
}
</script>

<style scoped>

.analytics_container {
    border-radius: 0.25rem;
    background: #f5f7fb;
    box-shadow: 0 0 .875rem 0 rgba(33, 37, 41, .05);
    margin-bottom: 24px;
    width: 30%;
    padding: 20px;
    display: inline-block;
    vertical-align: top;
    margin: 100px auto;
}
.analytics_title {
    margin-bottom: 20px;
}
.analytics_title p:first-child {
    font-size: 18px;
    font-weight: 500;
    color: #212529;
}
.analytics_title p:last-child {
    margin-top: 10px;
    font-size: 14px;
}
</style>