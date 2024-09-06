# Dashboard Charts Application

This project contains two main parts: a Django backend providing API endpoints and a Next.js frontend that renders charts using `Chart.js` and `ApexCharts`. The frontend makes API requests to the backend running on port 8000 by default.

## Setup Instructions

1. Clone the Repository
   git clone https://github.com/JeromeGohRY/Chart-Dashboard.git

### Backend (Django)

1. **Navigate to the Django backend folder**:
    Navigate to the chart_api directory containing the manage.py file.

2. **Install required Python packages**:
    Make sure you have Python 3.x and `pip` installed, then run:
    ```bash
    pip install django-cors-headers
    ```

3. **Run the Django development server**:
    Make sure Django is running on port `8000` (or your desired port) by executing:
    ```bash
    python manage.py runserver 8000
    ```

### Frontend (Next.js)

1. **Navigate to the Next.js frontend folder**:
    Naviagate to the my-app directory.


2. **Install required npm packages**:
    ```bash
    npm install react react-dom axios chart.js react-chartjs-2 apexcharts react-apexcharts
    ```

3. **Update the API base URL (if needed)**:
    If your Django server is **not running on port 8000**, you'll need to update the port in your `index.tsx` file where API requests are made (in `axios` calls):
    

4. **Start the Next.js development server**:
    ```bash
    npm run dev
    ```

5. **Access the application**:
    Open your browser and navigate to `http://localhost:3000`.

---

## Libraries and Tools Used

### Frontend
- **React** : Core libraries for building the user interface.
- **Next.js**: Framework for server-side rendering and routing.
- **Axios**: Library for making HTTP requests to the backend.
- **Chart.js**: For rendering Line, Bar, and Pie charts.
- **React-ChartJS-2**: React wrapper for integrating Chart.js.
- **ApexCharts** and **React-ApexCharts**: For rendering Candlestick charts.

### Backend
- **Django**: Backend web framework for creating the API.
- **Django CORS Headers**: Middleware to handle Cross-Origin Resource Sharing (CORS), allowing the frontend to communicate with the backend.

---

## Approach and Thought Process

### Chart Rendering
The project aimed to display different types of charts: Line, Bar, Pie, and Candlestick. While **Chart.js** works well for Line, Bar, and Pie charts, I encountered some issues when using it for the Candlestick chart. To address this, I decided to use **ApexCharts** for rendering Candlestick charts.

For the other charts, **Chart.js** was sufficient, and integrating it into the Next.js frontend using **react-chartjs-2** was a smooth process. The chart colors are globally defined using CSS for consistency.

### Backend API
The backend is minimal, designed to serve chart data via simple API endpoints. The focus was on setting up a few views in Django that return JSON responses formatted correctly for the frontend to consume. API responses are straightforward, providing the data necessary for each type of chart.

### Thought Process
The key consideration was building a modular and extendable system, where adding new charts or data sources in the future would require minimal changes. Keeping the backend lightweight and focusing on the frontend's chart rendering capabilities allows for easy maintenance and expansion.
