import React, { useContext, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MyContext } from '../../MyContext';
import { GET_OR_DELETE_OR_EDIT_PRODUCT_BY_ID } from '../../constants/api';
import { useNavigate } from 'react-router-dom';
import "./AdminPage.css"
import AddOrEditProduct from '../../components/AddOrEditProduct/AddOrEditProduct';


function createData(title, description, price, category, image, rating, id) {
  return { title, description, price, category, image, rating, id };
}

export const AdminPage = () => {

  const [currentId, setCurrentId] = useState(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const { products, fetchProducts } = useContext(MyContext);
  const navigate = useNavigate();

  const rows = [];
  products.map((p) => rows.push(createData(p.title, p.description, p.price, p.category, p.image, p.rating, p._id)));

  return (
    <div className='admin-page'>
      <button className='addProductButton' onClick={() => {
        setIsEdit(false);
        document.querySelector(".editDiv").classList.remove("hide");
      }}>Add product</button>
      <TableContainer sx={{ marginTop: 2, marginBottom: 2 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Price&nbsp;($)</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Rating</TableCell>
              <TableCell align="left">Remove product</TableCell>
              <TableCell align="left">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" onClick={() => navigate(`/product/${row.id}`)} className='hover'>
                  {row.title}
                </TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="left">{row.category}</TableCell>
                <TableCell align="left"><img src={row.image} alt="product" width={80} height={80} onClick={() => navigate(`/product/${row.id}`)} className='hover' /></TableCell>
                <TableCell align="left">rate: {row.rating.rate} count: {row.rating.count}</TableCell>
                <TableCell>
                  <button onClick={async () => {
                    try {
                      const response = await fetch(`${GET_OR_DELETE_OR_EDIT_PRODUCT_BY_ID}${row.id}`, { method: 'DELETE' });
                      const data = await response.json();
                      console.log(data);
                      fetchProducts();
                    } catch (e) {
                      console.log(e.message);
                    }
                  }}>Remove</button>
                </TableCell>
                <TableCell>
                  <button onClick={() => {
                    setCurrentId(row.id);
                    setCurrentTitle(row.title);
                    setIsEdit(true);
                    document.querySelector(".editDiv").classList.remove("hide");
                  }}>Edit</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddOrEditProduct edit={isEdit} id={currentId} title={currentTitle} fetchProducts={fetchProducts} />
    </div>
  )
}

export default AdminPage