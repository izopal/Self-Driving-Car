export function lerp(A, B, t){
        return A + (B - A) * t
    };

// функція визначення перетину двох прямих  за методом Крамера 
export function getIntersection(A, B, C, D){
        const tTop   = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x); 
        const uTop   = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y); 
        const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);
        
        if(bottom !== 0){
            const t = tTop / bottom;
            const u = uTop / bottom;
            if (t >= 0 && u >= 0 && u <=1){
                return {
                    x:      lerp(A.x, B.x, t),   
                    y:      lerp(A.y, B.y, t),
                    offset: t
                }
            }
        }
        return null;
    };

export function polysIntersect (pol1, pol2){
        for(let i = 0; i < pol1.length; ++i){
            for(let j = 0; j < pol2.length; ++j){
                const touch = getIntersection(pol1[i],
                                              pol1[(i + 1) % pol1.length],
                                              pol2[j],
                                              pol2[(j + 1) % pol2.length]);
                if(touch){
                    return true;
                }
            }
        }
        return false;
}