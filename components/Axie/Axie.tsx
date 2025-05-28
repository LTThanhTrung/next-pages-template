import { Text, Flex, Box, Image } from '@mantine/core';


export function Axie(axie: any) {
  return (
    <Flex justify='center' align='center' direction='row'>
      <Text c={axie.axie.flag ? "red" : "inherit"}>{axie.axie.id}</Text>
      <Image w={200} src={`https://storage.googleapis.com/axie-mixer/axies/${axie.axie.id}/axie/axie-full-transparent.png`} />
      <Box w={100} p={2} >
        <Image src={`https://cdn.axieinfinity.com/game/cards/base/${axie.axie.parts[0]}.png`} />
      </Box>

      <Box w={100} p={2} >
        <Image src={`https://cdn.axieinfinity.com/game/cards/base/${axie.axie.parts[1]}.png`} />
      </Box>
      <Box w={100} p={2} >
        <Image src={`https://cdn.axieinfinity.com/game/cards/base/${axie.axie.parts[2]}.png`} />
      </Box>
      <Box w={100} p={2} >
        <Image src={`https://cdn.axieinfinity.com/game/cards/base/${axie.axie.parts[3]}.png`} />
      </Box>
    </Flex>
  );
}
