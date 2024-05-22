import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const AnalystDashboard = () => {
    
    const tickets = [
        { id: 1, status: 'Deschis' },
        { id: 2, status: 'Inchis' },
        { id: 3, status: 'Deschis' },
        { id: 4, status: 'În așteptare' },
        { id: 5, status: 'Inchis' },
    ];

    const openTickets = tickets.filter(ticket => ticket.status === 'Deschis').length;
    const closedTickets = tickets.filter(ticket => ticket.status === 'Inchis').length;
    const pendingTickets = tickets.filter(ticket => ticket.status === 'În așteptare').length;
    const totalTickets = tickets.length;
    const solveRate = ((closedTickets / totalTickets) * 100).toFixed(2);

    const ticketsByMonth = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Tichete Deschise',
                data: [30, 20, 40, 35, 50, 55, 60, 70, 65, 75, 80, 90],
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: 'Tichete Inchise',
                data: [25, 15, 30, 28, 45, 50, 55, 60, 60, 70, 75, 85],
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };

    const ticketStatusDistribution = {
        labels: ['Deschise', 'În Așteptare', 'Inchise'],
        datasets: [
            {
                data: [openTickets, pendingTickets, closedTickets],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                hoverOffset: 4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="container-fluid mt-4">
            <h2>Analyst Dashboard</h2>
            <div className="row mb-4">
                <div className="col-md-4 mb-3">
                    <div className="card bg-light shadow-sm">
                        <div className="card-header">Tichete Deschise</div>
                        <div className="card-body">
                            <h5 className="card-title">{openTickets}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card bg-light shadow-sm">
                        <div className="card-header">Tichete În Așteptare</div>
                        <div className="card-body">
                            <h5 className="card-title">{pendingTickets}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card bg-light shadow-sm">
                        <div className="card-header">Tichete Inchise</div>
                        <div className="card-body">
                            <h5 className="card-title">{closedTickets}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <div className="card shadow-sm" style={{ height: '400px' }}>
                        <div className="card-header">
                            Trendul Tichetelor pe Luni
                        </div>
                        <div className="card-body">
                            <Line data={ticketsByMonth} options={chartOptions} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="card shadow-sm" style={{ height: '400px' }}>
                        <div className="card-header">
                            Distribuția Statusurilor Tichetelor
                        </div>
                        <div className="card-body">
                            <Doughnut data={ticketStatusDistribution} options={chartOptions} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card shadow-sm">
                        <div className="card-header">
                            Statistici Detaliate
                        </div>
                        <div className="card-body">
                            <ul className="list-unstyled">
                                <li>Total Tichete: {totalTickets}</li>
                                <li>Tichete Deschise: {openTickets}</li>
                                <li>Tichete Inchise: {closedTickets}</li>
                                <li>Tichete În Așteptare: {pendingTickets}</li>
                                <li>Rata de Rezolvare: {solveRate}%</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalystDashboard;
