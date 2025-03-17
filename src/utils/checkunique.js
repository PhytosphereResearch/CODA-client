function isLikelyRepeat (agent, synonym){
    if (synonym.genus===agent.genus && synonym.species===agent.species && synonym.subspecies==agent.subspecies){
        return true;
    } else{
        return false;
    }
}
export default isLikelyRepeat;