const CHUNK_SIZE_X = 16;
const CHUNK_SIZE_Y = 256;
const CHUNK_SIZE_Z = 16;

function index3D(x, y, z) {
    return x + CHUNK_SIZE_X * (z + CHUNK_SIZE_Z * y);
}
