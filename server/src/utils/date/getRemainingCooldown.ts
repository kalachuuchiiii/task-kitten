

export const getRemainingCooldown = (lastChange: Date, cooldown: number) => { //cooldownInMs
    const now = new Date();
 
    const remainingCooldown = cooldown - (now.getTime() - lastChange.getTime());
    return remainingCooldown;
}