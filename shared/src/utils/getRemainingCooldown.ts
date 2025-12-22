


export const getRemainingCooldown = (lastChange: Date | null | undefined, cooldown: number) => { //cooldownInMs
    if(!lastChange)return 0;
    const now = new Date();
 
    const remainingCooldown = cooldown - (now.getTime() - lastChange.getTime());
    return remainingCooldown;
}