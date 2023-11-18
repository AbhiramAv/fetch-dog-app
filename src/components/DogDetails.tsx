import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface DogCardProps {
  dog: {
    id: string;
    img: string;
    name: string;
    age: number;
    breed: string;
  };
}

class DogCard extends Component<DogCardProps> {
  render() {
    const { dog } = this.props;

    return (
      <Card>
        <CardMedia component="img" height="140" image={dog.img} alt={dog.name} />
        <CardContent>
          <Typography variant="h6" component="div">
            {dog.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Age: {dog.age}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Breed: {dog.breed}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default DogCard;
