
import React, { useEffect, useState } from 'react';
// ... [other imports]

const FindingFriend = () => {
    // State variables
    const [usersData, setUsersData] = useState([]);
    const [addedFriends, setAddedFriends] = useState([]); // State to track added friends
    // ... [other state declarations]

    // Load added friends from localStorage on component mount
    useEffect(() => {
        const savedAddedFriends = localStorage.getItem('addedFriends');
        if (savedAddedFriends) {
            setAddedFriends(JSON.parse(savedAddedFriends));
        }
    }, []);

    // Save added friends to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('addedFriends', JSON.stringify(addedFriends));
    }, [addedFriends]);

    // Function to add a friend
    const addFriend = (friend) => {
        // Assuming 'friend' is the object to be added
        const updatedList = [...usersData, friend];
        setUsersData(updatedList);
        // Update the added friends list
        setAddedFriends([...addedFriends, friend.id]); // Assuming 'id' is the identifier for a friend
        // Save the updated list to localStorage
        localStorage.setItem('savedFriendsList', JSON.stringify(updatedList));
    };

    // Filter the display list to exclude added friends
    const displayList = usersData.filter(user => !addedFriends.includes(user.id));

    // ... [rest of the component code]
};

export default FindingFriend;
