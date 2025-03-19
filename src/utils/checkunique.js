function isLikelyRepeat (agent, synonym){
    if (synonym.genus===agent.genus && synonym.species===agent.species && synonym.subSpecies==agent.subSpecies){
        return true;
    } else{
        return false;
    }
}
export default isLikelyRepeat;