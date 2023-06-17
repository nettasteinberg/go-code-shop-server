import React, { useContext } from "react";
import { MyContext } from "../../MyContext";
import "./FilterOrSort.css";

export const FilterOrSort = ({label}) => {
    const { categories, setFilterByValue, setSortByValue, sortOptions } = useContext(MyContext);
    let options = "";
    if (label === "Filter") {
        options = ["All products", ...categories];
    } else {
        options = ["Default", ...sortOptions];
    }

    return (
        <div className="collection-sort">
        <label>{`${label} by:`}</label>
        <select className={label === "Filter" ? "filter" : "sort"} onChange={(e) => label === "Filter" ? setFilterByValue(e.target.value) : setSortByValue(e.target.value) }>
            {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
    )
}