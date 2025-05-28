import classes from './Welcome.module.css';
import { useState } from 'react';
import * as axios from "axios"

import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import { ActionIcon, TextInput, Title, useMantineTheme, Flex } from '@mantine/core';
import { Axie } from '../Axie/Axie';

export function Welcome() {
  const [searchString, setSearchString] = useState("")
  const [axies, setAxies] = useState<any[]>([])
  const theme = useMantineTheme();

  const handleSubmit = async () => {
    const data = searchString.replace(/\s+/g, '').split(",");
    await axios.default.post('/api/test', { axiesID: data }).then((response) => {
      const responseData: any = response.data
      setAxies(responseData)
    })
  }

  const handleTextChange = (e: any) => {
    setSearchString(e.target.value)
  }

  const renderAxie = () => {
    const renderItem = axies.map((axie, index) => {
      return (
        <Axie key={index} axie={axie} />
      )
    })
    return renderItem
  }

  return (
    <Flex justify='center' align='center' direction='column'>
      <Title className={classes.title} ta="center" mt={100}>
        Axie Classic Checker
      </Title>

      <TextInput
        style={{ width: "500px" }}
        radius="xl"
        size="lg"
        placeholder="Axie ID (Separate by comma)"
        rightSectionWidth={42}
        leftSection={<IconSearch size={18} stroke={1.5} />}
        onChange={handleTextChange}
        rightSection={
          <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
            <IconArrowRight size={18} stroke={1.5}
              onClick={handleSubmit}
            />
          </ActionIcon>
        }
      />
      {renderAxie()}
    </Flex>
  );
}