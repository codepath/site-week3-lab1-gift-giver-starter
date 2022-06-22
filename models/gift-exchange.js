class GiftExchange {
    // Should implements an algorithm responsible for randomly pairing names together
    static pairs(names) {
        if (names.length % 2 === 1) {
            // throw new Error("Number of names cannot be odd")
            console.log("error")
        }
        
        const randomPairs = [];
        const half_length = (names.length/2)

        let arr1 = names.slice(0,half_length);
        let arr2 = names.slice(-half_length);
        
        arr1.sort(()=> Math.random() - 0.5);
        arr2.sort(()=> Math.random() - 0.5);
        // console.log("arr1:", arr1)
        // console.log("arr2:", arr2)
        let i = 0;
        while (arr1.length && arr2.length) {
            i++;
            let pair = []
            let name1 = arr1.pop();
            let name2 = arr2.pop();
            
            // let name2 = arr2[0] == name1 ? arr2.pop() : arr2.shift();
            // console.log("name1",i, name1)
            // console.log("name2:",i, name2)


            pair.push(name1,name2);
            randomPairs.push(pair);
            // console.log(i, pair);
            
        }
        // console.log("arr1!!!", arr1)
        // console.log("arr2!!!", arr2)
        console.log(randomPairs);
        return randomPairs;    
}
    // randomly match each name to another name in the list
    // list in sequential order
    static traditional(names) {
        const result = [];
        const half_length = (names.length/2)

        let arr1 = names.slice(0,half_length);
        let arr2 = names.slice(-half_length);
        
        arr1.sort(()=> Math.random() - 0.5);
        arr2.sort(()=> Math.random() - 0.5);
        console.log("arr1:tradi", arr1)
        console.log("arr2:", arr2)

    }
}


module.exports = GiftExchange