import React, { useState, useEffect } from 'react';
import {createRoot} from "react-dom/client"
import Axios from "axios"
import { response } from 'express';





function App() {

const UsersTable = () => {
    const [lowIncomeCarUsers, setLowIncomeCarUsers] = useState([]);
    const [expensivePhoneMaleUsers, setExpensivePhoneMaleUsers] = useState([]);
    const [longQuoteLastNameUsers, setLongQuoteLastNameUsers] = useState([]);
    const [noDigitCarUsers, setNoDigitCarUsers] = useState([]);
    const [topCitiesUsers, setTopCitiesUsers] = useState([]);
  
  
    useEffect(() => {
  
      const fetchData = async () => {
        const response = await Axios.get("/home");
        const data = await response.json();
      
        const lowIncomeCarUsersData = data.filter(
          user => user.income < 5 && (user.car === 'BMW' || user.car === 'Mercedes')
        );
        setLowIncomeCarUsers(lowIncomeCarUsersData);
      
        const expensivePhoneMaleUsersData = data.filter(
          user => user.gender === 'male' && user.phonePrice > 10000
        );
        setExpensivePhoneMaleUsers(expensivePhoneMaleUsersData);
      
        const longQuoteLastNameUsersData = data.filter(
          user => user.lastName.startsWith('M') && user.quote.length > 15 && user.email.includes(user.lastName)
        );
        setLongQuoteLastNameUsers(longQuoteLastNameUsersData);
      
        const noDigitCarUsersData = data.filter(
          user => (user.car === 'BMW' || user.car === 'Mercedes' || user.car === 'Audi') && !/\d/.test(user.email)
        );
        setNoDigitCarUsers(noDigitCarUsersData);
      
        const topCitiesUsersData = data.reduce((acc, user) => {
          if (acc[user.city]) {
            acc[user.city].count++;
            acc[user.city].totalIncome += user.income;
          } else {
            acc[user.city] = { count: 1, totalIncome: user.income };
          }
          return acc;
        }, {});
        const topCitiesUsersArray = Object.keys(topCitiesUsersData).map(city => ({
          city,
          count: topCitiesUsersData[city].count,
          averageIncome: topCitiesUsersData[city].totalIncome / topCitiesUsersData[city].count,
        })).sort((a, b) => b.count - a.count).slice(0, 10);
        setTopCitiesUsers(topCitiesUsersArray);
      };
      
  
    }, []);
  
    return (
      <div>
  
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Income</th>
              <th>Car</th>
            </tr>
          </thead>
          <tbody>
            {lowIncomeCarUsers.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.income}</td>
                <td>{user.car}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Price</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {expensivePhoneMaleUsers.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone_price}</td>
              <td>{user.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Quote</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {longQuoteLastNameUsers.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.quote}</td>
              <td>{user.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Car</th>
          </tr>
        </thead>
        <tbody>
          {noDigitCarUsers.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.car}</td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <table>
        <thead>
          <tr>
            <th>City</th>
            <th>No of Users</th>
            <th>Average Income</th>\
          </tr>
        </thead>
        <tbody>
          {topCitiesUsers.map(user => (
            <tr key={user._id}>
              <td>{user.city}</td>
              <td>{user.count}</td>
              <td>{user.averageIncome}</td>
            </tr>
          ))}
        </tbody>
      </table>    
  
      </div>
      
      
    );
  }


}


 export default App;
const root = createRoot(document.querySelector("#app"))
root.render(<App/>)