const getPath = (path) => {
  const prefix = 'https://ccpavmeycgczphxolyol.supabase.co/storage/v1/object/public/images/';
  return path.startsWith('http') ? path : prefix + path;
}