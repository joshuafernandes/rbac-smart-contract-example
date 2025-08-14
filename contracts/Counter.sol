// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Counter is AccessControl {
    uint256 public number;

    // Define custom role identifier
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");

    constructor(address admin, address user) {
        // Grant admin the default admin role
        _setupRole(DEFAULT_ADMIN_ROLE, admin);

        // Grant user the USER_ROLE
        _setupRole(USER_ROLE, user);
    }

    // ------------------
    // Role-based Actions
    // ------------------

    // Only admin can call
    function set(uint256 _number) public onlyRole(DEFAULT_ADMIN_ROLE) {
        number = _number;
    }

    function decrement() public onlyRole(DEFAULT_ADMIN_ROLE) {
        number--;
    }

    // Admin and users can increment
    function increment() public {
        require(
            hasRole(USER_ROLE, msg.sender) || hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Access denied: must have USER_ROLE or be admin"
        );
        number++;
    }

    // Public getter
    function get() public view returns (uint256) {
        return number;
    }

    // ----------------------
    // Role Management (Admin)
    // ----------------------

    // Grant USER_ROLE to an address (admin only)
    function addUser(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(USER_ROLE, account);
    }

    // Revoke USER_ROLE from an address (admin only)
    function removeUser(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(USER_ROLE, account);
    }

    // Check if an address has USER_ROLE
    function isUser(address account) public view returns (bool) {
        return hasRole(USER_ROLE, account);
    }

    // Check if an address is admin
    function isAdmin(address account) public view returns (bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }
}
