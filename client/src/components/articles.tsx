import { Card, Grid, Text, Button, Row, Col } from "@nextui-org/react";

const list = [
    {
      title: "Orange",
      img: "/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
      price: "$3.00",
    },
    {
      title: "Cherry",
      img: "/images/fruit-3.jpeg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "/images/fruit-4.jpeg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "/images/fruit-5.jpeg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "/images/fruit-6.jpeg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "/images/fruit-7.jpeg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
  ];
const Articles = () => {
    return (
       <>
         <Grid.Container gap={2} justify="center">
      <Grid xs={12} sm={4}>
        <Card1 />
      </Grid>
      <Grid xs={12} sm={4}>
        <Card2 />
      </Grid>
      <Grid xs={12} sm={4}>
        <Card3 />
      </Grid>
      <Grid xs={12} sm={4}>
        <Card1 />
      </Grid>
      <Grid xs={12} sm={4}>
        <Card2 />
      </Grid>
      <Grid xs={12} sm={4}>
        <Card3 />
      </Grid>
    </Grid.Container>
    <Grid.Container gap={2} justify="flex-start">
      {list.map((item, index) => (
        <Grid xs={6} sm={3} key={index}>
          <Card isPressable>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={"https://nextui.org" + item.img}
                objectFit="cover"
                width="100%"
                height={140}
                alt={item.title}
              />
            </Card.Body>
            <Card.Footer css={{ justifyItems: "flex-start" }}>
              <Row wrap="wrap" justify="space-between" align="center">
                <Text b>{item.title}</Text>
                <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                  {item.price}
                </Text>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
       </> 
    )
}
export const Card1 = () => (
    <Card>
        <Card isPressable>
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
            What to watch
          </Text>
          <Text h4 color="white">
            Stream the Acme event
          </Text>
        </Col>
      </Card.Header>
      <Card.Image
        src="https://nextui.org/images/card-example-4.jpeg"
        objectFit="cover"
        width="100%"
        height={340}
        alt="Card image background"
      />
    </Card>
        </Card>
      
  );

  export const Card2 = () => (
    <Card>
        <Card isPressable>
        <Card css={{ w: "100%" }}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
            Plant a tree
          </Text>
          <Text h4 color="white">
            Contribute to the planet
          </Text>
        </Col>
      </Card.Header>
      <Card.Image
        src="https://nextui.org/images/card-example-3.jpeg"
        width="100%"
        height={340}
        objectFit="cover"
        alt="Card image background"
      />
    </Card>
        </Card>
    </Card>
    
  );

  export const Card3 = () => (
    <Card>
        <Card isPressable>
        <Card css={{ bg: "$black", w: "100%" }}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
            Supercharged
          </Text>
          <Text h4 color="white">
            Creates beauty like a beast
          </Text>
        </Col>
      </Card.Header>
      <Card.Image
        src="https://nextui.org/images/card-example-2.jpeg"
        width="100%"
        height={340}
        objectFit="cover"
        alt="Card image background"
      />
    </Card>
        </Card>
    </Card>
   
  );
  

export default Articles;