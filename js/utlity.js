const checkFullName = (fullName) => 
{
    let fullNameRegex = RegExp('^[A-Za-z\\s]+$');
    if(!fullNameRegex.test(fullName)) throw 'Name is Incorrect!!!';
}
const checkAddress = (address) => 
{
    let words = address.split(" ");
    if(!words.length>1){
        let addressRegex = RegExp('^[#.0-9a-zA-Z\s,-]+$');
        for(const word of words){
            if(!addressRegex.test(word))
            throw 'Address Invalid';
        }
        throw 'Address Invalid';
    }    
}
const checkPhoneNumber = (PhoneNumber) => 
{
    let phoneRegex1 = RegExp('^[1-9][0-9]{9}$');
    let phoneRegex2 = RegExp('^[0-9]{2}[1-9][0-9]{9}$');
    let phoneRegex3 = RegExp('^[+][0-9]{2}[1-9][0-9]{9}$');
    if(!phoneRegex1.test(PhoneNumber) || !phoneRegex2.test(PhoneNumber) || !phoneRegex3.test(PhoneNumber))
        throw 'Phone Number is Invalid';
}

const checkZip =(zip) =>
{
    let zipRegex = RegExp('^[0-9]{6,}$');
    if(zipRegex.test(zip)) {
        this.zip = zip;
    } else {
        throw 'Zip Invalid';
    }
}