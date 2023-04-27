import { useState } from "react";
import { Container } from "react-bootstrap";
import { Box } from "@chakra-ui/layout";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    useToast,
    IconButton,
} from "@chakra-ui/react";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded';
import { useForm } from "react-hook-form";
import { dataResolver } from "../utils/dataResolver";
import Table from "../components/Table";
import { InputGroup } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import generatePushID from "../utils/generateId";


const Home = () => {
    const [filter, setFilter] = useState(false);
    const [people, setPeople] = useState([{ id: "dummyId#123456", username: "Rohan Singh", contact: 7897802647 }])
    const [searchData, setSearchData] = useState([])
    const [asce, setAsce] = useState(true)
    const toast = useToast();
    const [customErr, setCustomErr] = useState('');
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ resolver: dataResolver });

    const addPerson = ({ firstname, lastname, contact }) => {
        setCustomErr('');
        let ch = true;
        const username = `${firstname} ${lastname}`;
        if (`${contact}`.length !== 10) {
            setCustomErr('Contact number must be 10 digits long')
            ch = false
        }
        people.forEach(person => {
            if (person.username === username) {
                setCustomErr('Username already exist')
                ch = false
            }
            if (person.contact === contact) {
                setCustomErr('User with same contact number found')
                ch = false
            }
        });
        const finalData = {
            id: generatePushID(),
            username,
            contact,
        }
        if (ch) {
            setPeople(prevPersons => [...prevPersons, finalData])
            toast({
                title: 'top-right toast',
                position: 'top-right',
                isClosable: true,
                render: () => (
                    <Box color='white' p={3} bg='green.500'>
                        Added successfully!!
                    </Box>
                ),
            })
        }
    }
    const deletePersonData = (id) => {
        const data = people.filter(person => person.id !== id)
        setPeople(data)
        toast({
            title: 'top-right toast',
            position: 'top-right',
            isClosable: true,
            render: () => (
                <Box color='white' p={3} bg='red.500'>
                    Deleted successfully!!
                </Box>
            ),
        })
    }
    const handleSearch = (event) => {
        event.preventDefault();
        const val = event.target.search.value
        const data = people.filter(person => person.username === val)
        setSearchData(data)
        setFilter(true)
    }
    const handleSort = () => {
        let tempData = Array.from(people)
        const compare = (a, b) => {
            if (asce && a.username > b.username) {
                return false;
            }
            else if (a.username < b.username) {
                return true;
            }
            return false;
        }
        tempData.sort(compare)
        setPeople(tempData)
        setAsce(!asce)
    }

    return (
        <div className="home">
            <Box
                width="100%"
                margin={"0 auto"}
                padding={"20px 0"}
                display={"flex"}
                alignItems="center"
                justifyContent="center"
            >
                <Box width={{ base: "90%", md: "40%", lg: "30%" }} shadow="lg" background="white" p={12} rounded={6}>
                    <form onSubmit={handleSubmit(addPerson)}>
                        <div className="username" style={{ display: "flex", flexDirection: 'row', alignItems: 'flex-end' }}>
                            <FormControl isInvalid={errors.firstname}>
                                <FormLabel htmlFor="firstname">Name</FormLabel>
                                <Input
                                    type="text"
                                    name="firstname"
                                    required
                                    placeholder="First Name"
                                    width={'90%'}
                                    {...register("firstname")}
                                />
                                <FormErrorMessage>
                                    {errors.firstname && errors.firstname.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl marginTop={"2"} isInvalid={errors.lastname}>
                                <Input
                                    type="text"
                                    name="lastname"
                                    required
                                    width={'90%'}
                                    placeholder="Last Name"
                                    {...register("lastname")}
                                />
                                <FormErrorMessage>
                                    {errors.lastname && errors.lastname.message}
                                </FormErrorMessage>
                            </FormControl>
                        </div>

                        <FormControl marginTop="2" isInvalid={errors.contact}>
                            <FormLabel htmlFor="contact">Contact Number</FormLabel>
                            <Input
                                type="number"
                                name="contact"
                                required
                                placeholder="Enter Contact No."
                                {...register("contact")}
                            />
                            <FormErrorMessage>
                                {errors.amount && errors.amount.message}
                            </FormErrorMessage>
                        </FormControl>


                        <Box mt="5" color="red.500">
                            {errors.API_ERROR && errors.API_ERROR.message}
                            {customErr && customErr}
                        </Box>

                        <Button
                            // isLoading={isSubmitting}
                            mt={4}
                            colorScheme="whatsapp"
                            type="submit"
                            w="100%"
                        >
                            Save
                        </Button>
                    </form>
                </Box>
            </Box>
            <Container id="content">
                <form onSubmit={handleSearch}>
                    <InputGroup background={'white'} style={{ borderRadius: "50px", margin: "10px 0 10px 0" }}>
                        <Input name="search" type='text' placeholder='User name' />
                        <Button bg={'inherit'} type="submit"><SearchRoundedIcon color='gray.300' /></Button>
                    </InputGroup>
                </form>
                {filter ? (
                    <>
                        <IconButton
                            variant='outline'
                            colorScheme='blue'
                            margin={2}
                            aria-label='Send email'
                            onClick={() => setFilter(false)}
                            icon={<FilterAltOffRoundedIcon />}
                        />
                        <Table data={searchData} handleSort={handleSort} deletePersonData={deletePersonData} />
                    </>
                ) : <Table data={people} handleSort={handleSort} deletePersonData={deletePersonData} />}
            </Container>
        </div>
    );
};

export default Home;
