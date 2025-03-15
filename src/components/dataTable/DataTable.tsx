// import CSS for Data Table
import "./DataTable.css";

/* Set the props and initialize the type interface */
interface DataTableProps {
  avatar: string;
  name: string;
  email: string;
  age: number;
  gender: "male" | "female" | "other";
  address?: string;
  codeCountry: string;
}

const DataTable = ({
  avatar,
  name,
  email,
  age,
  gender,
  codeCountry,
  address,
}: DataTableProps) => {
  // import meta environment for API Flag
  const apiFlag = import.meta.env.VITE_API_FLAG_URL;

  return (
    <div className="table-container">
      <div className="wrap-left-info">
        <div className="avatar-cell">
          <img src={avatar} alt={`${name}'s avatar`} className="avatar" />
        </div>
        <div className="user-info">
          <h3 className="name">{name}</h3>
          <p className="email">{email}</p>
        </div>
      </div>
      <div className="wrap-center-info">
        <span className="age">{age}</span>
        <span className={gender === "female" ? "gender-female" : "gender-male"}>
          {gender}
        </span>
        <span>
          <picture>
            <source
              type="image/webp"
              srcSet={`
                           ${apiFlag}/48x36/${codeCountry.toLowerCase()}.webp 3x`}
            />
            <source
              type="image/png"
              srcSet={`
      ${apiFlag}/48x36/${codeCountry.toLowerCase()}.png 3x`}
            />
            <img
              src={`${apiFlag}/${codeCountry.toLowerCase()}.png`}
              width="40"
              height="25"
              alt={`Flag of ${codeCountry}`}
              loading="lazy"
            />
          </picture>
        </span>
      </div>

      <div className="wrap-right-info">
        {address && <td className="address">{address}</td>}
      </div>
    </div>
  );
};

export default DataTable;
