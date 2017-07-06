// For detecting if the user have a specific role
function hasRole(mem, role){
    if(pluck(mem.roles).includes(role)){
        return true;
    } else {
        return false;
    }
}
