import { useState } from "react";
import "./style.css";

export default function Users() {
  const [user, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [repo, setRepo] = useState([]);

  const getUser = () => {
    fetch(`https://api.github.com/users/${searchTerm}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data);
      });
  };
  const getRepos = () => {
    fetch(`https://api.github.com/users/${searchTerm}/repos`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRepo(data);
      });
  };
  const handleCombinedClick = () => {
    if (searchTerm === "") {
      alert("Search for users");
    } else {
      getRepos();
      getUser();
    }
  };
  return (
    <div className="container">
      <input
        placeholder="Find user from GitHub"
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleCombinedClick}>Find</button>
      <div key={user.id} className="container_info">
        <img src={user.avatar_url} height={"150px"} />
        <div className="info">Name:</div>
        <div>{user.name}</div>
        <div className="info">Location:</div>
        <div>{user.location}</div>
        <div className="info">Bio:</div>
        <div>{user.bio}</div>
      </div>
      <div className="container_repo">
        <div className="info">Names of repositories:</div>
        {repo.map((repo) => (
          <div className="repos" key={repo.id}>
            {repo.name}
          </div>
        ))}
      </div>
    </div>
  );
}
