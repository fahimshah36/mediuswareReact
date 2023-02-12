import React, {useState, useEffect} from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [data, setData] = useState([]);
  const [localData, setLocalData] = useState();
  const handleClick = (val) => {
    console.log(val);
    if (val === "active") {
      setLocalData(
        JSON.parse(localStorage.getItem("formValues"))
          .filter((value) => JSON.stringify(value) !== "[]")
          .filter((value) => value.status === "Active")
      );
    } else if (val === "completed") {
      setLocalData(
        JSON.parse(localStorage.getItem("formValues"))
          .filter((value) => JSON.stringify(value) !== "[]")
          .filter((value) => value.status === "Completed")
      );
    } else {
      let allData = [];
      allData.push(
        ...JSON.parse(localStorage.getItem("formValues"))
          .filter((value) => JSON.stringify(value) !== "[]")
          .filter((value) => value.status === "Active"),
        ...JSON.parse(localStorage.getItem("formValues"))
          .filter((value) => JSON.stringify(value) !== "[]")
          .filter((value) => value.status === "Completed"),
        ...JSON.parse(localStorage.getItem("formValues"))
          .filter((value) => JSON.stringify(value) !== "[]")
          .filter((value) => value.status !== "Active")
          .filter((value) => value.status !== "Completed")
      );
      console.log(allData);
      setLocalData(allData);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const status = event.target.status.value;

    event.target.reset();
    setData({name, status});
    SaveDataToLocalStorage(data);
  };

  useEffect(() => {
    var array = [];
    array = JSON.parse(localStorage.getItem("formValues")) || [];
    array.push(data);
    localStorage.setItem("formValues", JSON.stringify(array));
  }, [data]);

  useEffect(() => {
    setLocalData(
      JSON.parse(localStorage.getItem("formValues")).filter(
        (value) => JSON.stringify(value) !== "[]"
      )
    );
  }, [data]);

  console.log(localData);
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                name="status"
                type="text"
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {localData &&
                localData.map((item) => {
                  return (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.status}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
