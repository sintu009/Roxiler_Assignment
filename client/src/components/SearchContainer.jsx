import { Form, useSubmit } from "react-router-dom";
import { useAllDataContext } from "../pages/HomeLayout";

const SearchContainer = () => {
  const { searchValues } = useAllDataContext();
  const search = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };
  return (
    <div>
      <Form>
        <input
          type="search"
          name="search"
          placeholder="Search Transaction"
          defaultValue={search}
          onChange={debounce((form) => {
            submit(form);
          })}
          className="px-4 py-2 bg-white border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </Form>
    </div>
  );
};

export default SearchContainer;
