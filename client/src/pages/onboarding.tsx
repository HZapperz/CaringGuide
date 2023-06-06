import React, {useState} from 'react'
import { Navbar, Text, Image, Button,Card, Grid, Input, createTheme, Dropdown, Radio, Textarea, useInput, Spacer} from "@nextui-org/react";
import {  ArrowRightIcon } from '@heroicons/react/20/solid';

const onboarding = () => {
  
  const [selected, setSelected] = React.useState(new Set(["Patient Condition"]));
  const [selected2, setSelected2] = React.useState(new Set(["Patient Condition Experience"]));
  const [Item, setItem] = React.useState(new Set(["Gender"]));
  const [relationship, setRelationship] = React.useState(new Set(["Relationship to Patient"]));

  const selectedRelationship = React.useMemo(
    () => Array.from(relationship).join(", ").replaceAll("_", " "),
    [relationship]
  );
  
  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const selected2Value = React.useMemo(
    () => Array.from(selected2).join(", ").replaceAll("_", " "),
    [selected2]
  );
  const selectedItem = React.useMemo(
    () => Array.from(Item).join(", ").replaceAll("_", " "),
    [Item]
  );
 
  
  const { value, reset, bindings } = useInput("");
  
  const validateEmail = (value) => {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  const helper = React.useMemo(() => {
    if (!value)
      return {
        text: "",
        color: "",
      };
    const isValid = validateEmail(value);
    return {
      text: isValid ? "Correct email" : "Enter a valid email",
      color: isValid ? "success" : "error",
    };
  }, [value]);


  const [cardState, setCardState] = useState("menteeCard");
  
  const theme = createTheme({
    type: "dark", // it could be "light" or "dark"
    theme: {
      colors: {
        
  
        // you can also create your own color
        myColor: "#eceeed"
  
        
      },
      space: {},
      fonts: {}
    }
  })



    const [firstname, setfirstname] = useState('')
    const handleSubmit=(e) =>{
      e.preventDefault();
      if(firstname.length == 0)
      {
        seterror (true)
      }
      console.log(firstname)
    }
    const [error, seterror] = useState(false)


  return (
   
    <div>
      <div>
    <Navbar
      isBordered
      variant="sticky"
      maxWidth="fluid"
      css={{
        $$navbarBackgroundColor: "#FFFFFFFF",
        $$navbarBlurBackgroundColor: "#FFFFFFFF",
      }}>
        <Navbar.Brand>
        <Image src="/images/Caring-Guide-logo-horiz-color.png"  width={200} height={40} />
      </Navbar.Brand>
    </Navbar>
    </div>

    <Text style={{ fontSize: 33 , fontWeight: '600' , margin: '25px 150px  '}} >Onboarding</Text>
        
   
   


   
<div>
<Button.Group >
    <Grid.Container
    gap={20}
    alignItems="center"
    justify="center"

    >
    <Grid sm={12} md={5}>
    <Card 
        isPressable
        isHoverable
        css={{ mw: "400px" ,}}
        className = "border border-transparant focus:border-caring"
        onClick = {() => setCardState("menteeCard1")}
        >
          <div className = "card_header"> 
            <div className = "card_body">
            <Card.Header>
            <Text style={{ fontSize: 21, margin: 'auto'}}>Become a Mentee</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body >
            <Text  style={{ fontSize: 17, padding: '7px 20px'}}>Recieve guidance with caregiving from an experienced mentor.</Text>
            </Card.Body>
            </div>
          </div>
        </Card>
        </Grid> 
   




      <Grid sm={12} md={5}>
      <Card 
        isPressable
        isHoverable
        css={{ mw: "400px",   }}
        className = "border border-transparant focus:border-caring height:2px"
        onClick = {() => setCardState("mentorCard2")}
        >
          <div className = "card_header"> 
            <div className = "card_body">
            <Card.Header>
            <Text style={{ fontSize: 21, margin: 'auto'}}>Mentor</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body >
            <Text  style={{ fontSize: 17, padding: '7px 20px'}}>Help inexperienced caregivers by offering advice and resources.</Text>
            </Card.Body>
            </div>
          </div>
        </Card> 
        </Grid>
    </Grid.Container>
    </Button.Group>
    </div>


    





      <div>
        {cardState === "menteeCard1" && 
        

        <div >
          <form onSubmit={handleSubmit}>
            <div>
          <Input onChange={e=>setfirstname(e.target.value)}
          clearable
          underlined 
          labelPlaceholder="First Name" 
          color="secondary" 
          />
          </div>
          {error && firstname.length<= 0? <label > Please fill first name</label>: ""}
          <div>

          <button style={{ fontSize: 20, fontWeight: 450}}
          color="secondary">
           Complete Onboarding
          <ArrowRightIcon className="h-8 w-8 text-white pt-1" />
      </button>
          </div>
          </form>



          <hr style={{  margin: 'auto  '}} width="80%" ></hr>

          <Text style={{ fontSize: 20 , fontWeight: '500',  margin: '20px 150px  '}}>PERSONAL DETAILS</Text>
          <Grid.Container gap={10}
          alignItems="center"
          justify = "center"
          >
           
          <Grid>
          <Input
          clearable
          underlined 
          labelPlaceholder="First Name" 
          color="secondary" />
          </Grid>

          
          <Grid>
          <Input 
          bordered
          clearable
          underlined  
          labelPlaceholder="Middle Name" 
          color="secondary" />
          </Grid>
          

          <Grid>
          <Input 
          clearable
          underlined 
          labelPlaceholder="Last Name" 
          color="secondary" />
          </Grid>
          </Grid.Container>
          
          <Grid.Container
          gap={10}
          alignItems="center"
          justify="center">
          <Grid>
          <Input 
          clearable
          type ="number"
          underlined 
          labelPlaceholder="Age" 
          color="secondary" />
          </Grid>

          <Grid>
          <Dropdown>
          <Dropdown.Button flat  css={{ tt: "capitalize" }}>
            {selectedItem}
            
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Gender"
            color="default"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={Item}
            onSelectionChange={setItem}
          >
            <Dropdown.Item key="Male"> Male</Dropdown.Item>
            <Dropdown.Item key="Female">Female</Dropdown.Item>
            <Dropdown.Item key="Non-Binary">Non-Binary</Dropdown.Item>
            <Dropdown.Item key="Other">Other </Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
          </Grid>
          </Grid.Container>
          
          <hr style={{  margin: 'auto '}}  width="80%"></hr>
          <Text style={{ fontSize: 20 , fontWeight: '500',  margin: '20px 150px  '}}>CONTACT DETAILS</Text>
          
          <Grid.Container gap={10}
          alignItems="center"
          justify="center">
          <Grid>
          <Input 
          {...bindings}
          clearable
          underlined 
          onClearClick={reset}
          status={helper.color}
          color={helper.color}
          helperColor={helper.color}
          helperText={helper.text}
          type="email"
          
          labelPlaceholder="Email"
          color="secondary" />
          </Grid>

          <Grid>
          <Input 
          clearable
          type ="number"
          underlined 
          labelPlaceholder="Mobile Number" 
          color="secondary" />
          </Grid>
          </Grid.Container>
          
          <hr style={{  margin: 'auto  '}}  width="80%"></hr>
          <Text style={{ fontSize: 20 , fontWeight: '500',  margin: '20px 150px  '}}>PATIENT INFORMATION</Text>
          <Grid.Container
          gap={10}
          alignItems="center"
          justify="center">
          <Grid>
            <Input 
            clearable
            underlined 
            labelPlaceholder="Patient Name" 
            color="secondary" />
          </Grid>

          <Grid>
            <Dropdown>
            <Dropdown.Button flat  css={{ tt: "capitalize" }}>
              
              {selectedValue}
              
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Patient Condition"
              color="default"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selected}
              onSelectionChange={setSelected}
            >
              <Dropdown.Item key="Multiple Melanoma">Multiple Melanoma</Dropdown.Item>
              <Dropdown.Item key="Alzhiemer's Disease">Alzhiemer's Disease</Dropdown.Item>
              <Dropdown.Item key="Parkinson's Disease">Parkinson's Disease</Dropdown.Item>
              <Dropdown.Item key="Stroke">Stroke </Dropdown.Item>
              <Dropdown.Item key="ALS">ALS</Dropdown.Item>
              </Dropdown.Menu>
              </Dropdown>
            </Grid>




            <Grid>
            <Dropdown>
            <Dropdown.Button flat  css={{ tt: "capitalize" }}>
              
              {selectedRelationship}
              
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Relationship to Patient"
              color="default"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={relationship}
              onSelectionChange={setRelationship}
            >
              <Dropdown.Item key="Spouse">Spouse </Dropdown.Item>
              <Dropdown.Item key="Child">Child</Dropdown.Item>
              <Dropdown.Item key="Family Member">Parent</Dropdown.Item>
              <Dropdown.Item key="Other">Other </Dropdown.Item>
              </Dropdown.Menu>
              </Dropdown>
            </Grid>
            </Grid.Container>



          <Grid.Container
          gap={10}
          alignItems="center"
          justify="center">
            <Grid>
            <Radio.Group 
            label="Years of Caregiving " defaultValue="1" orientation="horizontal">
              <Radio value="1" color="secondary" >
                0-2 Years
              </Radio>
              <Radio value="2" color="secondary" >
                2-4 Years
              </Radio>
              <Radio value="3"  color="secondary">
                4+ Years
              </Radio>
            </Radio.Group>
            </Grid>
          </Grid.Container>


          <Grid.Container
          alignItems="center"
          justify="center">
          <Grid>
              <Text> Synopsis of Patient Condition</Text>
            <Textarea   style={{ fontSize: 15 }}
          minRows={20}
          width = '700px'
          bordered
          color="secondary"/>
          <Spacer x={5.7} />
            </Grid>
          </Grid.Container>

          <Grid.Container
        alignItems="center"
        justify="center"
        >
        <Grid>
          <Button style={{ fontSize: 20, fontWeight: 450}}
      color="secondary">
        Complete Onboarding
        <ArrowRightIcon className="h-8 w-8 text-white pt-1" />
      </Button>
      <Spacer x={8} />
          </Grid>
          </Grid.Container>
        
        
    
        </div>
        }











        {cardState === "mentorCard2" && 
        <div >
        <hr style={{  margin: 'auto  '}} width="80%" ></hr>

        <Text style={{ fontSize: 20 , fontWeight: '500',  margin: '20px 150px  '}}>PERSONAL DETAILS</Text>
        <Grid.Container gap={10}
        alignItems="center"
        justify = "center"
        >
         
        <Grid>
        <Input
        clearable
        underlined 
        labelPlaceholder="First Name" 
        color="secondary" />
        </Grid>

        
        <Grid>
        <Input 
        bordered
        clearable
        underlined  
        labelPlaceholder="Middle Name" 
        color="secondary" />
        </Grid>
        

        <Grid>
        <Input 
        clearable
        underlined 
        labelPlaceholder="Last Name" 
        color="secondary" />
        </Grid>
        </Grid.Container>
        
        <Grid.Container
        gap={10}
        alignItems="center"
        justify="center">
        <Grid>
        <Input 
        clearable
        type ="number"
        underlined 
        labelPlaceholder="Age" 
        color="secondary" />
        </Grid>

        <Grid>
        <Dropdown>
        <Dropdown.Button flat  css={{ tt: "capitalize" }}>
          {selectedItem}
          
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label="Gender"
          color="default"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={Item}
          onSelectionChange={setItem}
        >
          <Dropdown.Item key="Male"> Male</Dropdown.Item>
          <Dropdown.Item key="Female">Female</Dropdown.Item>
          <Dropdown.Item key="Non-Binary">Non-Binary</Dropdown.Item>
          <Dropdown.Item key="Other">Other </Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>
        </Grid>
        </Grid.Container>
        
        <hr style={{  margin: 'auto '}}  width="80%"></hr>
        <Text style={{ fontSize: 20 , fontWeight: '500',  margin: '20px 150px  '}}>CONTACT DETAILS</Text>
        
        <Grid.Container gap={10}
        alignItems="center"
        justify="center">
        <Grid>
        <Input 
        {...bindings}
        clearable
        underlined 
        onClearClick={reset}
        status={helper.color}
        color={helper.color}
        helperColor={helper.color}
        helperText={helper.text}
        type="email"
        
        labelPlaceholder="Email"
        color="secondary" />
        </Grid>

        <Grid>
        <Input 
        clearable
        type ="number"
        underlined 
        labelPlaceholder="Mobile Number" 
        color="secondary" />
        </Grid>
        </Grid.Container>
        
        <hr style={{  margin: 'auto  '}}  width="80%"></hr>
        <Text style={{ fontSize: 20 , fontWeight: '500',  margin: '20px 150px  '}}>PATIENT INFORMATION</Text>
        <Grid.Container
        gap={10}
        alignItems="center"
        justify="center">
        

        <Grid>
          <Dropdown>
          <Dropdown.Button flat  css={{ tt: "capitalize" }}>
            
            {selected2Value}
            
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Patient Condition Experience"
            color="default"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selected2}
            onSelectionChange={setSelected2}
          >
            <Dropdown.Item key="Multiple Melanoma">Multiple Melanoma</Dropdown.Item>
            <Dropdown.Item key="Alzhiemer's Disease">Alzhiemer's Disease</Dropdown.Item>
            <Dropdown.Item key="Parkinson's Disease">Parkinson's Disease</Dropdown.Item>
            <Dropdown.Item key="Stroke">Stroke </Dropdown.Item>
            <Dropdown.Item key="ALS">ALS</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
          </Grid>




          
          </Grid.Container>



        <Grid.Container
        gap={10}
        alignItems="center"
        justify="center">
          <Grid>
          <Radio.Group 
          label="Years of Caregiving " defaultValue="1" orientation="horizontal">
            <Radio value="1" color="secondary" >
              0-2 Years
            </Radio>
            <Radio value="2" color="secondary" >
              2-4 Years
            </Radio>
            <Radio value="3"  color="secondary">
              4+ Years
            </Radio>
          </Radio.Group>
          </Grid>
        </Grid.Container>


        <Grid.Container
        alignItems="center"
        justify="center">
        <Grid>
            <Text> About Section</Text>
          <Textarea   style={{ fontSize: 15 }}
        minRows={20}
        width = '700px'
        bordered
        color="secondary"/>
        <Spacer x={8} />
          </Grid>
          
        </Grid.Container>
        
        
        <Grid.Container
        alignItems="center"
        justify="center"
        >
        <Grid>
          <Button
          style={{ fontSize: 20, fontWeight: 450}}
      color="secondary">
        Complete Onboarding
        <ArrowRightIcon className="h-8 w-8 text-white pt-1" />
      </Button>
      <Spacer x={8} />
          </Grid>
          </Grid.Container>
      
  
      </div>
      }
      </div>

      


  </div>
    
      
  
  )
}
export default onboarding