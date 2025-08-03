export const prerender = false;
export async function POST({ request } : { request: Request }) {
    const formData = await request.formData();
    const email = formData.get('email');
  
    if (!email || typeof email !== 'string') {
        return new Response(JSON.stringify({message: "Valid Email Required",}), { status: 400 }
        );
      }

      const today = new Date().toISOString().split('T')[0];

      const checkRes = await fetch(`${import.meta.env.SECRET_SHEETDB_URL}/search?email=${encodeURIComponent(email)}`);

      if (!checkRes.ok) {
        return new Response(JSON.stringify({ message: 'Error checking email' }), { status: 500 });
      }
    
      const existing = await checkRes.json();
    
      if (existing.length > 0) {
        return new Response(JSON.stringify({ message: 'Looks like you have already fueled up! Sit back and let the stories cruise in' }), { status: 409 });
      }


      // Post to SheetDB
      const sheetRes = await fetch(import.meta.env.SECRET_SHEETDB_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization' : import.meta.env.SECRET_SHEETS_DB_TOKEN },
        body: JSON.stringify({ data: [{ email, date: today }] }),
      });
    
      if (!sheetRes.ok) {
        return new Response(JSON.stringify({ message: 'Failed to save email' }), { status: 500 });
      }
    return new Response(JSON.stringify({ message: 'Looks like you have saddled up! Sit back and let the stories cruise in. Thanks for subscribing !!!' }), { status: 200 });
  }