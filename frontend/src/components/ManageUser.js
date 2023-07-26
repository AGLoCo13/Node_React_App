import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', address: '', cellphone: '', role: '' });
  const [editUser, setEditUser] = useState({address:'',cellphone:'', role:''})
  const [selectedUser, setSelectedUser] = useState(null);
  const[showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
      
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (selectedUser){
      setEditUser((prevEditUser) =>({
        ...prevEditUser,
        [name]:value,
      }));
    }else{
    setNewUser((prevNewUser) => ({
      ...prevNewUser,
      [name]: value,
    }));
  }
  };

  const createUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/register', newUser);
      setNewUser({ name: '', email: '', password: '', address: '', cellphone: '', role: '' });
      fetchUsers();
      toast.success("User created succesfully");
    } catch (error) {
      console.error('Error creating user:', error.response.data);
      toast.error('Error creating user');
    }
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    setEditUser({
      address: user.address,
      cellphone: user.cellphone,
      role: user.role,
    });
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const { address, cellphone, role } = editUser;
      const updatedField = { address, cellphone, role };
      await axios.put(`http://localhost:5000/api/users/${selectedUser._id}`, updatedField);
      setSelectedUser(null);
      setEditUser({ address: '', cellphone: '', role: '' });
      fetchUsers();
      toast.success('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Error updating user');
    }
  };

  const deleteUser = (user) => {
    setSelectedUser(user);
    setShowConfirmation(true);
  };

  const handleDeleteConfirmation = async(confirmed) => {
    setShowConfirmation(false);
    if (confirmed && selectedUser){
      try{
        await axios.delete(`http://localhost:5000/api/users/${selectedUser._id}`);
      fetchUsers();
      toast.success('User deleted succesfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user')
    }
  }
  };

  return (
    <div className="container">
      <h2 className="text-center">Manage Users</h2>
      <form onSubmit={createUser}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" className="form-control" name="name" value={newUser.name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" name="email" value={newUser.email} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" className="form-control" name="password" value={newUser.password} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" className="form-control" name="address" value={newUser.address} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="cellphone">Cellphone:</label>
          <input type="text" className="form-control" name="cellphone" value={newUser.cellphone} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select className="form-control" name="role" value={newUser.role} onChange={handleInputChange} required>
            <option value="">Select a role</option>
            <option value="Tenant">Tenant</option>
            <option value="Administrator">Administrator</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Create User</button>
      </form>

      <h3 className="text-center">Users List:</h3>
      <ul className="list-group">
        {users.map((user) => (
          <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
            {user.name} - {user.email}
            <button className="btn btn-primary mr-2" onClick={() => selectUser(user)}>Edit</button>
            <button className="btn btn-danger" onClick={() => deleteUser(user)}>Delete</button>
          </li>
        ))}
      </ul>
          {showConfirmation && (
            <div className='confirmation-popup'>
              <p>Are you sure you want to delete this user?</p>
              <button className='btn btn-danger' onClick={()=> handleDeleteConfirmation(true)}>Yes</button>
              <button className='btn btn-secondary' onClick={() => handleDeleteConfirmation(false)}>No</button>
              </div>
          )}
      {selectedUser && !showConfirmation &&(
        <div className="edit-user-container mt-4">
          <h3 className="text-center">Edit User</h3>
          <form onSubmit={updateUser}>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input type="text" className="form-control" name="address" value={editUser.address} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="cellphone">Cellphone:</label>
              <input type="text" className="form-control" name="cellphone" value={editUser.cellphone} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <select className="form-control" name="role" value={editUser.role} onChange={handleInputChange}>
                <option value="Tenant">Tenant</option>
                <option value="Administrator">Administrator</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Update User</button>
            <button className="btn btn-secondary ml-2" onClick={() => setSelectedUser(null)}>Cancel</button>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default ManageUsers;