// terrain.js — server-side chunk generator

const CHUNK_SIZE_X = 16;
const CHUNK_SIZE_Y = 256;
const CHUNK_SIZE_Z = 16;

export function generateChunk(cx, cz) {
    const blocks = new Uint16Array(CHUNK_SIZE_X * CHUNK_SIZE_Y * CHUNK_SIZE_Z);
    const blockStates = new Uint16Array(CHUNK_SIZE_X * CHUNK_SIZE_Y * CHUNK_SIZE_Z);

    for (let x = 0; x < CHUNK_SIZE_X; x++) {
        for (let z = 0; z < CHUNK_SIZE_Z; z++) {

            const worldX = cx * CHUNK_SIZE_X + x;
            const worldZ = cz * CHUNK_SIZE_Z + z;

            const height = 64 + Math.floor(
                8 * Math.sin(worldX * 0.05) +
                8 * Math.cos(worldZ * 0.05)
            );

            for (let y = 0; y < CHUNK_SIZE_Y; y++) {
                const index = x + CHUNK_SIZE_X * (z + CHUNK_SIZE_Z * y);

                if (y > height) {
                    blocks[index] = 0; // air
                } else if (y === height) {
                    blocks[index] = 1; // grass
                } else if (y > height - 4) {
                    blocks[index] = 2; // dirt
                } else {
                    blocks[index] = 3; // stone
                }

                blockStates[index] = 0;
            }
        }
    }

    return { cx, cz, blocks, blockStates };
}

