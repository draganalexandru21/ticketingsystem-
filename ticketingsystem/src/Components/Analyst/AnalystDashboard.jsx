import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const AnalystDashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const token = localStorage.getItem('token');
            const analystId = localStorage.getItem('userId'); // Ensure the user ID is stored in localStorage upon login

            if (!token || !analystId) {
                throw new Error('User is not authenticated or user ID is missing');
            }

            const response = await axios.get(`http://localhost:8080/api/v1/tickets/analyst/${analystId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTickets(response.data);
        } catch (error) {
            console.error("There was an error fetching the tickets!", error);
            setError('There was an error fetching the tickets.');
        }
    };

    const openTickets = tickets.filter(ticket => ticket.status === 'OPEN').length;
    const closedTickets = tickets.filter(ticket => ticket.status === 'CLOSED').length;
    const totalTickets = openTickets + closedTickets;
    const solveRate = totalTickets > 0 ? ((closedTickets / totalTickets) * 100).toFixed(2) : 0;

    const ticketsByMonth = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Tichete Deschise',
                data: [30, 20, 40, 35, 50, 55, 60, 70, 65, 75, 80, 90], // Replace with actual data
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: 'Tichete Inchise',
                data: [25, 15, 30, 28, 45, 50, 55, 60, 60, 70, 75, 85], // Replace with actual data
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };

    const ticketStatusDistribution = {
        labels: ['Deschise', 'Inchise'],
        datasets: [
            {
                data: [openTickets, closedTickets],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
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
            {error && <div className="alert alert-danger">{error}</div>}
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
                        <div className="card-header">Tichete Inchise</div>
                        <div className="card-body">
                            <h5 className="card-title">{closedTickets}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card bg-light shadow-sm">
                        <div className="card-header">Total Tichete</div>
                        <div className="card-body">
                            <h5 className="card-title">{totalTickets}</h5>
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
