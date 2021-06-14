import React, {useState} from "react";

export default function CipherComponent() {

    //store code values for upper + lower alphas for reuse
    const A_code = 'A'.charCodeAt(0) //65
    const Z_code = 'Z'.charCodeAt(0) // 90
    const a_code = 'a'.charCodeAt(0) // 97
    const z_code = 'z'.charCodeAt(0) // 122

    //track text string and shift integer inputs
    const inputObject = {text: '', shift: 0}
    const [cachedItem, setCachedItem] = useState(inputObject)
    const [show, setShow] = useState(false)

    const [cipher, setCipher] = useState('encrypt');

    //flag for encrypt/decrypt modes
    function toggle() {
        console.log(cipher)
        if (cipher === 'encrypt') {
            setCipher('decrypt')
        } else {
            setCipher('encrypt')

        }
    }

    //Encryption of a letter x by a shift n is (x + n) % 26
    function encrypt(str, n) {
        let acc = "" //accumulate decrypted str
        for (let i = 0; i < str.length; i++) {
            let char = str[i];
            let x_code = str[i].charCodeAt(0)
            //append non-alpha chars as is
            if (!(/[a-zA-Z]/).test(str[i])) {
                acc += char;
                continue;
            }
            //handle upper alphas, codes 65-90
            if (char.toUpperCase() === char) {
                let ch = x_code - A_code //get char code according to upper alpha A
                let ch_orig = (ch + n) % 26 + A_code // E_n = (x + n) % 26
                acc += String.fromCharCode(ch_orig);
            }
            //handle lower alpha, codes 97-122
            if (char.toLowerCase() === char) {
                let ch = x_code - a_code //get char code according to lower alpha a
                let ch_orig = (ch + n) % 26 + a_code
                acc += String.fromCharCode(ch_orig);
            }
        }
        return acc;
    }

    //Decryption, D_n = (x - n) mod 26
    function decrypt(str, n) {
        let acc = ""
        for (let i = 0; i < str.length; i++) {
            let char = str[i];
            let x_code = str[i].charCodeAt(0)
            //append non-alpha chars as is
            if (!(/[a-zA-Z]/).test(char)) {
                acc += char;
                continue;
            }
            if (char.toUpperCase() === char) {
                let ch = x_code - Z_code //ciphered char - 97
                let ch_orig = (ch - n) % 26 + Z_code
                acc += String.fromCharCode(ch_orig);

            }
            if (char.toLowerCase() === char) {
                let ch = x_code - z_code //ciphered char - 122
                let ch_orig = (ch - n) % 26 + z_code
                acc += String.fromCharCode(ch_orig);
            }
        }
        return acc;
    }

    return (
        <div className="container container-fluid">
            <h1> Encryption / Decryption Web App </h1>
            <div className="jumbotron">
                <div>
                    <p className="lead">
                        Click button below to toggle between encrypt and decrypt mode:</p>
                    <button className={'btn btn-outline-info'} onClick={toggle}> Current
                        mode: {cipher}</button>
                </div>
                <br/>

                <div>
                    <div className="form-group">
                        <p>Enter in text string and shift integer
                            for {cipher}ion:</p>
                        <div className="input-group">

                            <input type="text" className="form-control"
                                   placeholder={'text string'}
                                   onChange={(e) => {
                                       setShow(false)
                                       setCachedItem({...cachedItem, text: e.target.value})
                                   }}
                            />

                            <input type="text" className="form-control"
                                   placeholder={'shift value'}
                                   onChange={(e) => {
                                       setShow(false)
                                       setCachedItem(
                                           {...cachedItem, shift: Number(e.target.value)})
                                   }}

                            />
                        </div>
                      <div> <br/>
                            <button className="btn btn-info" onClick={() => setShow(true)}> Submit
                            </button>
                      </div>

                    </div>


                    {/*display resulting string according to mode and only after clicking Decode*/}
                    <div>
                        {show && cipher === 'decrypt' && <h2> Decrypted text: {decrypt(
                            cachedItem.text,
                            cachedItem.shift)} </h2>}
                        {show && cipher === 'encrypt' && <h2> Encrypted text: {encrypt(
                            cachedItem.text,
                            cachedItem.shift)} </h2>}
                    </div>
                </div>
            </div>
        </div>
    );
}


