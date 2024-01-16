import { KeyboardEvent, useEffect, useState, useRef } from 'react'
import { usersData, User } from '../../users'
import SelectedUser from './UserChip';

function UsersList() {
    const [users, setUsers] = useState<User[]>(usersData);
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');               
    const [lastElementSelected, setLastElementSelected] = useState<boolean>(false);
    const [selectedUserIndex, setSelectedUserIndex] = useState<number>(-1);
    const [showUsersList, setShowUsersList] = useState<boolean>(false)
    const searchUserContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setSearchResults(
            users.filter(user => (
                `${user.name} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase())
            ))
        )

        const handleClickOutsideSearchContainer = (event: MouseEvent) => {
            if (searchUserContainerRef.current && !searchUserContainerRef.current.contains(event.target as Node)) {
              setShowUsersList(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutsideSearchContainer);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideSearchContainer);
        };
    }, [searchTerm, users])


    const handleSelect = (user:User) => {
        setSelectedUsers((prev) => [...prev, user]);
        setUsers((prevUsers) => prevUsers.filter((item) => item.email !== user.email));
        setSelectedUserIndex(-1);
    }

    const removeUserFromSelectedList = (removeUser:User) => {
        setSelectedUsers(users => users.filter(user => user.email !== removeUser.email))
        setUsers(prev => [...prev, removeUser])
        setLastElementSelected(false)
        setSelectedUserIndex(-1);
    }

    const handleKeyDown = (event:KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && searchTerm === '' && selectedUsers.length) {
            if (searchTerm === '' && !lastElementSelected) {
                setLastElementSelected(true);
            } else if (searchTerm === '' && lastElementSelected) {
                const lastSelectedUser = selectedUsers[selectedUsers.length - 1];
                setSelectedUsers((prev) => prev.filter((user) => user.email !== lastSelectedUser.email));
                setUsers((prev) => [...prev, lastSelectedUser]);
                setLastElementSelected(false);
            }
        } 
        // To handle the keyboard navigation (arrow keys)
        else if (event.key === 'ArrowDown' && showUsersList) {
            setSelectedUserIndex((prev) => Math.min(prev + 1, searchResults.length - 1));
        } 
        else if (event.key === 'ArrowUp' && showUsersList) {
            setSelectedUserIndex((prev) => Math.max(prev - 1, -1));
        } 
        else if (event.key === 'Enter' && showUsersList && selectedUserIndex !== -1) {
            handleSelect(searchResults[selectedUserIndex]);
        }
    };


    const usersList = searchTerm ? searchResults : users;

    return (
        <div className='flex-grow'>
            <div className='w-3/4 border-b border-blue-500 mt-28 mx-auto flex flex-wrap'>
                {selectedUsers.map((selectedUser, idx) => (
                    <SelectedUser 
                        key={selectedUser.email} 
                        user={selectedUser} 
                        selected={true} 
                        handleSelect={handleSelect} 
                        onDelete={removeUserFromSelectedList} 
                        lastElementSelected={lastElementSelected && idx === selectedUsers.length-1} 
                    />
                ))}
                <div className='relative flex-grow' >
                    <input className='w-full h-full outline-none border-collapse' onKeyDown={handleKeyDown} onChange={e => setSearchTerm(e.target.value)} onFocus={() => setShowUsersList(true)} />
                    {   showUsersList && 
                        <div ref={searchUserContainerRef} className='absolute max-h-72 overflow-y-auto border px-2 py-2'>
                            {usersList.map((user, idx) => (
                                <SelectedUser 
                                    key={user.email}
                                    user={user} 
                                    selected={false}
                                    keyBoardNavHover={idx === selectedUserIndex || false} 
                                    handleSelect={handleSelect}
                                    onDelete={removeUserFromSelectedList}
                                    lastElementSelected={false}
                                />
                            ))}
                            {usersList.length === 0 && <div>No users found!</div>}
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default UsersList;