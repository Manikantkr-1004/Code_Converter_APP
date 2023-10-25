import React, { useState } from 'react'
import {Box, Button, Flex, Select, useToast} from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import axios from "axios"

export function Conveter() {

    const [language,setLanguage] = useState("");
    const [code,setCode] = useState("");
    const [result,setResult] = useState("Here you will get Result😃😃");
    const toast = useToast();

    const handleEditorChange = (newValue, event) => {
        setCode(newValue);
    };

    const handleConvert = ()=>{
        if(code==="" || language===""){
            toast({
                status:"warning",
                title:"Code or Language should not be Empty",
                isClosable:true,
                duration:3000,
                position:"bottom"
            })
            return;
        }

        setResult("Please Wait....");

        axios.post("https://lazy-teddy-tick.cyclic.app/convert",{code,language})
        .then((res)=>{
            setResult(res.data);
        }).catch((err)=>{
            setResult("Something went wrong, Please refresh and try again!!")
        })
    }

    const handleDebug = ()=>{
        if(code===""){
            toast({
                status:"warning",
                title:"Code should not be Empty",
                isClosable:true,
                duration:3000,
                position:"bottom"
            })
            return;
        }

        setResult("Please Wait....");

        axios.post("https://lazy-teddy-tick.cyclic.app/debug",{code})
        .then((res)=>{
            setResult(res.data);
        }).catch((err)=>{
            setResult("Something went wrong, Please refresh and try again!!")
        })
    }
    
    const handleQualityCheck = ()=>{
        if(code===""){
            toast({
                status:"warning",
                title:"Code should not be Empty",
                isClosable:true,
                duration:3000,
                position:"bottom"
            })
            return;
        }

        setResult("Please Wait....");

        axios.post("https://lazy-teddy-tick.cyclic.app/quality",{code})
        .then((res)=>{
            setResult(res.data);
        }).catch((err)=>{
            setResult("Something went wrong, Please refresh and try again!!")
        })
    }

    return (
        <Box w="100%">
            <Flex w="100%" bg="#e2e2e2" justifyContent="space-evenly" gap="10px" alignItems="center" h="100px">
                <Select value={language} onChange={(e)=> setLanguage(e.target.value)} w="21%" 
                border="2px solid black" _hover={{border:"2px solid black"}}>
                    <option value="">--Select Language--</option>
                    <option value="JAVA">JAVA</option>
                    <option value="JAVSCRIPT">JAVASCRIPT</option>
                    <option value="C++">C++</option>
                    <option value="C">C</option>
                    <option value="PYTHON">PYTHON</option>
                </Select>
                <Button onClick={handleConvert} _focus={{border:"3px solid #747474"}} variant="unstyled" bg="black" color="white" w="21%">CONVERT</Button>
                <Button onClick={handleDebug} _focus={{border:"3px solid #747474"}} variant="unstyled" bg="black" color="white" w="21%">DEBUG</Button>
                <Button onClick={handleQualityCheck} _focus={{border:"3px solid #747474"}} variant="unstyled" bg="black" color="white" w="21%">QUALITY CHECK</Button>
            </Flex>

            <Flex w="100%" justifyContent="space-between">
                <Box w="50%" h="1500px" borderRight="2px solid black">
                    <Editor height="100%" 
                    onChange={handleEditorChange}
                    theme='vs-dark'
                    options={{
                        inlineSuggest: true,
                        fontSize: "16px",
                        formatOnType: true,
                        autoClosingBrackets: true,
                        minimap: { scale: 10 }
                      }}
                      language='javascript' />
                </Box>
                <Box w="50%" h="1500px" p="10px" color="black"
                fontSize="20px" fontWeight="semibold" borderLeft="2px solid black">
                    {result}
                </Box>
            </Flex>
        </Box>
    )
}
