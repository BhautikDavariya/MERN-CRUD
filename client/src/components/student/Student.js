import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchsStudents } from '../../store/action-types/Action'
import ActionButton from './ActionButton'
import DataTable from 'react-data-table-component';
import EditStudents from './EditStudents';
import DeleteStudent from './DeleteStudent';
import Header from '../../frontend/Header';
import Col from 'react-bootstrap/esm/Col';
import '../../frontend/css/style.css'

function Student() {
  const dispatch = useDispatch();
  const {students} = useSelector(state => state)
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [studentId, setStudentId] = useState(null)
  const paginationRowsPerPageOptions = [10, 15, 25, 50, 100]
  const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);


  const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);


  const handlePageChange = page => {
    dispatch(fetchsStudents(page, perPage, setTotalRows, setPerPage))
	};


  const handlePerRowsChange = (newPerPage, page) =>{
    dispatch(fetchsStudents(page, newPerPage, setTotalRows, setPerPage))
  }


  useEffect(() => {

    dispatch(fetchsStudents(1, perPage, setTotalRows))
  },  [])

  const editBtn = (id) => {
    setStudentId(id)
    setIsEdit(true)
  } 
  const deleteBtn = (id) => {
    setStudentId(id)
    setIsDelete(true)
  }

  const itemsValue = students && students?.length >= 1 && students?.map(item => ({
    firstName: item.firstName,
    lastName: item.lastName,
    age: item.age,
    email: item.email,
    city: item.city,
    phoneno: item.phoneno,
    id: item._id
}));

  const columns = [
    {
      name: 'Id',
      selector: row => row.id,
   },
    {
        name: 'Frist Name',
        selector: row => row.firstName,
    },
    {
        name: 'Last Name',
        selector: row => row.lastName,
    },
    {
      name: 'Age',
      selector: row => row.age,
    },
    {
      name: 'Email',
      selector: row => row.email,
    },
    {
      name: 'City',
      selector: row => row.city,
    },
    {
      name: 'Phone',
      selector: row => row.phoneno,
    },
    {
      name: 'Action',
      right: true,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      cell: row => <ActionButton isViewIcon={true} 
      editBtn={editBtn} deleteBtn={deleteBtn}
      item={row}
      isEditMode={true}
      />
    },
];

const filteredItems = filterText ? itemsValue.filter(
  item => item.firstName && item.firstName.toLowerCase().includes(filterText.toLowerCase()),
) : itemsValue;

const subHeaderComponentMemo = React.useMemo(() => {
  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText('');
    }
  };

  return (
      <>
      <Col xxl={12} className='d-flex flex-wrap align-items-center justify-content-between col-12 col-md-8 col-lg-8'>
        <div className='d-flex align-items-center justify-content-center'>
          <span>MERN</span><span>
            <input type='search' className='ms-3 form-control border-none' onChange={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
          </span>
        </div>
        <Header />
      </Col>
      </>
  );
}, []);

  return (
    <>
    <div className='container-md'>
      <div className='react-table'>
    <DataTable 
    columns={columns} 
    data={filteredItems} 
    subHeader={true}  
    paginationRowsPerPageOptions={paginationRowsPerPageOptions} 
    // onChangePage={handlePageChange} 
    pagination={true} 
    paginationServer={true}
    // sortServer
    // paginationTotalRows={totalRows}
    subHeaderComponent={subHeaderComponentMemo}
    onChangeRowsPerPage={handlePerRowsChange}
    // persistTableHead={false}
    paginationTotalRows={totalRows}
			onChangePage={handlePageChange}
    />
    </div>
    </div>
    {isEdit && <EditStudents isEdit={isEdit} setIsEdit={setIsEdit} studentId={studentId}/>}
    {isDelete && <DeleteStudent isDelete={isDelete} setIsDelete={setIsDelete} studentId={studentId}/>}
    </>
  )
}
export default Student