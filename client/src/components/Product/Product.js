import { CardActions, CardMedia } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../MyContext';
import "./Product.css";
import AddToCartButtons from '../AddToCartButtons/AddToCartButtons';

export const Product = ({ image, title, price, id }) => {
  const { itemsInCart } = useContext(MyContext);
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 200 }} className="product-card">
      <CardMedia
        component="img"
        alt={title}
        height="200"
        image={image}
        gap="5"
        onClick={() => navigate(`product/${id}`)}
      />
      <CardContent height="200" className="product-info">
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price}$
        </Typography>
      </CardContent>
      <CardActions className='buttonsProductClass'>
        <AddToCartButtons id={id} title={title} price={price} image={image} />
        <div>Amount in cart: {id in itemsInCart ? itemsInCart[id]["amount"] : 0}</div>
      </CardActions>

    </Card>
  );
}

export default Product