import Table from 'react-bootstrap/Table';
import { Alert, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertIcon, Button, IconButton, useDisclosure } from '@chakra-ui/react';
import DeleteIcon from '@mui/icons-material/Delete';
import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
function TransactionTable(props) {
    const { data, deletePersonData, handleSort } = props;
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Table style={{ marginBottom: '30px' }} className="table align-middle bg-white">
            <thead className="bg-light" >
                <tr>
                    <th>SN.</th>
                    <th>
                        Name{'  '}
                        <IconButton
                            variant='unstyled'
                            colorScheme='red'
                            aria-label='Send email'
                            onClick={handleSort}
                            icon={<ImportExportRoundedIcon />}
                        />
                    </th>
                    <th>Contact</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody style={{ overflowY: 'scroll' }}>
                {data.length === 0 ? (
                    <tr style={{ background: '#feebc8' }}>
                        <td colSpan={4}>

                            <Alert status='warning'>
                                <AlertIcon />
                                No data found!!!
                            </Alert>
                        </td>
                    </tr>
                ) : data?.map((item, key) => (
                    <tr key={item.id}>
                        <td>
                            <div className="d-flex align-items-center ms-3">
                                <p className="fw-bold mb-1">{key + 1}</p>

                            </div>
                        </td>
                        <td>
                            <p className="fw-bold mb-1">{item.username}</p>
                        </td>
                        <td>{item.contact}</td>

                        <td>
                            <IconButton
                                variant='outline'
                                colorScheme='red'
                                aria-label='Send email'
                                onClick={onOpen}
                                icon={<DeleteIcon />}
                            />
                            <AlertDialog
                                isOpen={isOpen}
                                onClose={onClose}
                            >
                                <AlertDialogOverlay>
                                    <AlertDialogContent>
                                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                            Delete User Data
                                        </AlertDialogHeader>

                                        <AlertDialogBody>
                                            Are you sure? You can't undo this action afterwards.
                                        </AlertDialogBody>

                                        <AlertDialogFooter>
                                            <Button onClick={onClose}>
                                                Cancel
                                            </Button>
                                            <Button colorScheme='red' onClick={() => {
                                                deletePersonData(item.id)
                                                onClose()
                                            }} ml={3}>
                                                Delete
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialogOverlay>
                            </AlertDialog>
                        </td>
                    </tr>
                ))}
            </tbody>


        </Table>
    );
}

export default TransactionTable;