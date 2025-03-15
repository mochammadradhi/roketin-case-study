import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/card/Card";
import DataTable from "./components/dataTable/DataTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMars,
  faVenus,
  faCoffee,
  faStar,
  faUsers,
  faFlag,
  faPersonWalking,
} from "@fortawesome/free-solid-svg-icons";
import { GlobalGet } from "./helpers/fetcher";

/* Set the props for fetch API and initialize the type interface */
interface User {
  picture: { medium: string };
  name: { first: string; last: string };
  email: string;
  dob: { age: number };
  gender: string;
  nat: string;
  registered: { date: string };
  location: {
    street: { name: string; number: number };
    city: string;
    country: string;
  };
}
// use the icon for fontawesome react
library.add(faFlag, faCoffee, faStar, faUsers, faMars, faVenus);

function App() {
  // state for users
  const [users, setUsers] = useState<User[]>([]);
  // state for loading
  const [loading, setLoading] = useState(true);
  // state for errors
  const [error, setError] = useState("");
  // import meta environment for API Random User
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch API using helpers to fetch and hit the endpoint API url with limits data 25
    const fetchUsers = async () => {
      try {
        const data = await GlobalGet<User[]>(apiUrl, {
          params: { results: "25" },
        });
        setUsers(data.results);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  interface NationalityCount {
    [key: string]: number;
  }

  const countNationalities = (users: User[]): NationalityCount => {
    // reducing the data to get nationality count
    return users.reduce((acc: NationalityCount, user) => {
      const nat = user.nat;
      acc[nat] = (acc[nat] || 0) + 1;
      return acc;
    }, {});
  };

  const getMostCommonGender = (users: User[]) => {
    // check if the data is not available
    if (!users?.length) return "No data";

    // reducing the data to count sample data to comparing
    const genderCounts = users.reduce((acc, user) => {
      const gender = user.gender;
      acc[gender] = (acc[gender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // check if there are any counts
    if (Object.keys(genderCounts).length === 0) {
      return "No data";
    }
    // comparing sample data with the greater gender at the moment
    const mostCommonGender = Object.entries(genderCounts).sort(
      ([, a], [, b]) => b - a
    )[0][0];
    // slice to capitalize first letter
    return mostCommonGender.charAt(0).toUpperCase() + mostCommonGender.slice(1);
  };

  const calculateAverageAge = (users: User[]): number => {
    // check if the data is not available
    if (!users?.length) return 0;
    // reducing the data to count sample data age
    const totalAge = users.reduce((sum, user) => sum + user.dob.age, 0);
    // count the average based on all count age data divide total users
    const average = totalAge / users.length;
    // get the value absolute
    return Math.round(average);
  };

  const calculateAverageMembership = (users: User[]): number => {
    // check if the data is not available
    if (!users?.length) return 0;
    // set the date current
    const currentDate = new Date();
    // set milisecond in year
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365;
    // reducing the data to count sample data registered date
    const totalMembershipYears = users.reduce((sum, user) => {
      // convert the date
      const registeredDate = new Date(user.registered.date);
      // get the time to count the difference
      const timeDifference = currentDate.getTime() - registeredDate.getTime();
      // get the difference in a years
      const yearsDifference = timeDifference / millisecondsInYear;
      return sum + yearsDifference;
    }, 0);
    // count the average based on all count membership data divide total users
    const average = totalMembershipYears / users.length;
    // get the value absolute
    return Math.round(average);
  };

  // set the value calculated data
  const nationalityCounts = countNationalities(users);
  const totalNationalities = Object.keys(nationalityCounts).length;
  const mostCommonGender = getMostCommonGender(users);
  const averageAge = calculateAverageAge(users);
  const averageMembership = calculateAverageMembership(users);

  // states loading during fetching an API
  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <span>Loading...</span>
      </div>
    );
  // state preventing erros fetching an API
  if (error) return <div>{error}</div>;

  return (
    <>
      <h1 className="title">Member Dashboard</h1>
      <div className="wrap">
        <Card
          title={totalNationalities}
          subTitle="Different Nationality"
          icon={<FontAwesomeIcon icon={faFlag} />}
        />
        <Card
          title={mostCommonGender}
          subTitle="Most Gender"
          icon={
            mostCommonGender === "Female" ? (
              <FontAwesomeIcon icon={faVenus} />
            ) : (
              <FontAwesomeIcon icon={faMars} />
            )
          }
        />
        <Card
          title={`~ ${averageAge}`}
          subTitle="Avarage Age"
          icon={<FontAwesomeIcon icon={faPersonWalking} />}
        />
        <Card
          title={`~ ${averageMembership}`}
          subTitle="Average Membership"
          icon={<FontAwesomeIcon icon={faUsers} />}
        />
      </div>

      <div className="table-wrap">
        {users.map((user, index) => (
          <DataTable
            key={index}
            avatar={user.picture.medium}
            name={`${user.name.first} ${user.name.last}`}
            email={user.email}
            age={user.dob.age}
            codeCountry={user.nat}
            gender={user.gender as "male" | "female" | "other"}
            address={`${user.location.street.name} ${user.location.street.number}, ${user.location.city}, ${user.location.country}`}
          />
        ))}
      </div>
    </>
  );
}

export default App;
